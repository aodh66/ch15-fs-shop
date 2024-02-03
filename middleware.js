import { NextResponse } from "next/server";
import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';

import { checkRole } from "@/lib/api-functions/server/utils";
import settings from "@/lib/api-functions/server/permissions";

const {
  identifier,
  roles: { admin: adminRole },
} = settings;

export const config = {
  matcher: ["/admin/(.*)"],
};

export default withMiddlewareAuthRequired(async function middleware(req) {
  try {
    const res = NextResponse.next();
    const {user} = await getSession(req, res);

    // console.log("user", user);
    const isAdmin = checkRole(user, identifier, adminRole);
    // console.log("isAdmin", isAdmin);
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  } catch (err) {
    // console.log("in error", err);
    // If not logged in
    NextResponse.redirect(new URL("/api/auth/login", req.url));
  }
});