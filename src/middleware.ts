import {
  clerkMiddleware,
  clerkClient,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/farm(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  if (userId && (path === "/" || path.startsWith("/auth/"))) {
    const user = await (await clerkClient()).users.getUser(userId);
    const userRole = user.publicMetadata.role;

    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/farm/dashboard", req.url));
    }
  }

  if (!userId && (path === "/" || path.startsWith("/auth/"))) {
    return NextResponse.next();
  }

  if (!userId) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const userRole = user.publicMetadata.role;

  if (isProtectedRoute(req)) {
    if (path.startsWith("/admin") && userRole !== "admin") {
      console.log("Redirecting non-admin from admin to farm");
      return NextResponse.redirect(new URL("/farm/dashboard", req.url));
    }

    if (
      path.startsWith("/farm") &&
      userRole === "admin" &&
      path !== "/admin/dashboard"
    ) {
      console.log("Redirecting admin from farm to admin");
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

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
