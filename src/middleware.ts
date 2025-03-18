export { auth as middleware } from "@/auth"

export const config = {
  matcher: ['/((?!api|images|_next/static|_next/image|.*\\.png|ico|webp$).*)'],
}