// import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";

// import { NextResponse } from "next/server";

// // Set the paths that don't require the user to be signed in
// const publicPaths = [
//   "/",
//   "/sign-in*",
//   "/sms-notifications*",
//   "/sms-campaign*",
//   "/api/documents/generate_signature_iframe",
//   "/sign_pdf*",
// ];

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sms-notifications",
    "/sms-campaign",
    "/api/documents/generate_signature_iframe",
    "/sign_pdf(.*)",
    "/monitoring",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

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

//   // if the user is not signed in redirect them to the sign in page.
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
