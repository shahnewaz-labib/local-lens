import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isProtected = createRouteMatcher(["/test", "/", "/places(.*)"])

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) auth().protect()
})

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
