import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/farm(.*)",
  "/admin(.*)",
  "/auth(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Allow unauthenticated access to auth routes
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.next();
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const path = req.nextUrl.pathname;
  const userRole = user.publicMetadata.role;

  console.log(`Path: ${path}, Role: ${userRole}`);

  if (isProtectedRoute(req)) {
    // Non-admin trying to access admin routes - redirect to farm
    if (path.startsWith("/admin") && userRole !== "admin") {
      console.log("Redirecting non-admin from admin to farm");
      return NextResponse.redirect(new URL("/farm/dashboard", req.url));
    }

    // Admin trying to access farm routes - redirect to admin (but not if already on admin dashboard)
    if (
      path.startsWith("/farm") &&
      userRole === "admin" &&
      path !== "/admin/dashboard"
    ) {
      console.log("Redirecting admin from farm to admin");
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Handle users without a role - default to farm (but not if already on farm dashboard)
    if (!userRole && path !== "/farm/dashboard") {
      console.log("Redirecting user without role to farm");
      return NextResponse.redirect(new URL("/farm/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
