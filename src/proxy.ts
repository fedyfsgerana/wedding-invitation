import { NextRequest, NextResponse } from "next/server";

const ADMIN_ROUTE_SLUGS = (process.env.ADMIN_ROUTE_SLUG || "auth/administrator")
  .split(",")
  .map((slug) => slug.trim())
  .filter(Boolean);

const REAL_ADMIN_PATH = "/admin";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isRealAdminPath =
    pathname === REAL_ADMIN_PATH || pathname.startsWith(`${REAL_ADMIN_PATH}/`);

  if (isRealAdminPath) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-tidak-ditemukan-404";
    return NextResponse.rewrite(url, { status: 404 });
  }

  for (const slug of ADMIN_ROUTE_SLUGS) {
    const secretPrefix = `/${slug}`;
    const isSecretAdminPath =
      pathname === secretPrefix || pathname.startsWith(`${secretPrefix}/`);

    if (isSecretAdminPath) {
      const rest = pathname.slice(secretPrefix.length);
      const url = req.nextUrl.clone();
      url.pathname = `${REAL_ADMIN_PATH}${rest}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|favicon.ico|apple-touch-icon.png|images).*)",
  ],
};
