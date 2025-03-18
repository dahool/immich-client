import { authConfig } from "@/auth.config";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { authenticate } from "@/server/api"
import { z } from 'zod'

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"],
    accessToken: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === "/login" && auth) {
        return Response.redirect(new URL('/album', nextUrl));
      }
      return !!auth
    },
    /*async jwt({token, user, account}) {
      return token;
    },*/
    // token.sub contains the user id, in this case, we are ussing accessToken as the id
    async session({session, token}) {
      if(session && token) {
        session = Object.assign({}, session, {accessToken: token.sub});
      }
      console.log(`session token: ${JSON.stringify(token)}, session: ${JSON.stringify(session)}`);
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().nonempty() })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await authenticate(email, password)
          if (!user) return null
          return { name: user.name, id: user.accessToken, email: user.userEmail, image: user.profileImagePath }
        }
        return null
      },
    }),
  ],
})