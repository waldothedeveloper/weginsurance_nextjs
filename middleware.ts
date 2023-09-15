import { authMiddleware } from "@clerk/nextjs/server";

const publicPaths = [
  "/",
  "/sign_in(.*)",
  "/sms_notifications(.*)",
  "/sms_campaign(.*)",
  "/sign_pdf(.*)",
  "/api/notifications(.*)",
  "/api/documents(.*)",
];

export default authMiddleware({
  publicRoutes: publicPaths,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// OLD CODE BELOW - DEPRECATED
// import { NextResponse } from "next/server";

// const isPublic = (path) => {
//   return publicPaths.find((x) =>
//     path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
//   );
// };

// export default withClerkMiddleware((request) => {
//   if (isPublic(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   const { userId } = getAuth(request);

// if the user is not signed in redirect them to the sign in page.
//   if (!userId) {
//     const signInUrl = new URL("/sign-in", request.url);
//     signInUrl.searchParams.set("redirect_url", request.url);
//     return NextResponse.redirect(signInUrl);
//   }
//   return NextResponse.next();
// });

// export const config = {
//   matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
// };
