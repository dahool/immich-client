import { environment } from "@/env/environment"
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: environment.auth.sessionSecret,
  debug: true,
  trustHost: true,
  providers: []
} satisfies NextAuthConfig