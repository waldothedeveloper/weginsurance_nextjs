import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up-not-allowed(.*)",
  "/sms-notifications(.*)",
  "/sms-campaign(.*)",
  "/api/documents/generate_signature_iframe(.*)",
  "/sign_pdf(.*)",
  "/monitoring(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (!auth().userId && !isPublicRoute(request)) {
    return auth().redirectToSignIn();
  }
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
