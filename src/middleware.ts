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

  if (userId) {
    const user = await (await clerkClient()).users.getUser(userId);
    const userRole = user.publicMetadata.role;

    if (path === "/" || path.startsWith("/auth/")) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/farm/dashboard", req.url));
    }

    if (isProtectedRoute(req)) {
      if (path.startsWith("/admin") && userRole !== "admin") {
        return NextResponse.redirect(new URL("/farm/dashboard", req.url));
      }
      if (path.startsWith("/farm") && userRole === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }
  } else if (!isProtectedRoute(req)) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
