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

  if (isProtectedRoute(req)) {
    const user = await (await clerkClient()).users.getUser(userId);
    const userRole = user.publicMetadata.role;

    if (isProtectedRoute(req)) {
      const user = await (await clerkClient()).users.getUser(userId);
      const userRole = user.publicMetadata.role;

      if (path.startsWith("/admin")) {
        if (userRole !== "admin") {
          return NextResponse.redirect(new URL("/farm/dashboard", req.url));
        }
        return NextResponse.next();
      }

      if (path.startsWith("/farm")) {
        if (userRole === "admin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }

        return NextResponse.next();
      }
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
