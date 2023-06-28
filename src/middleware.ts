import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Constants } from "./conf/constants";

const isRouteProtected = (path: string) => {
    const protectedRoutes = ["/profile"];

    let isProtected = false;

    for (let i = 0; i < protectedRoutes.length; i++) {
        if (path.startsWith(protectedRoutes[i])) {
            isProtected = true;
            break;
        }
    }

    return isProtected;
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const homeRedirectUrl = new URL("/", req.nextUrl);
    const loginRedirectUrl = new URL("/auth/login", req.nextUrl);

    const unsetAuthResponse = (redirect: boolean = true) => {
        const res = redirect ? NextResponse.redirect(loginRedirectUrl) : NextResponse.next();
        res.cookies.delete(Constants.AUTH_TOKEN_NAME);
        res.cookies.delete(Constants.JWT_TOKEN);
        return res;
    };

    const xAuthToken = req.cookies.get(Constants.AUTH_TOKEN_NAME)?.value || null;

    if (path === "/logout") return unsetAuthResponse(false);

    if (path.startsWith("/auth") && xAuthToken) return NextResponse.redirect(homeRedirectUrl);

    if (req.cookies.has(Constants.JWT_TOKEN)) {
        const jwt = req.cookies.get(Constants.JWT_TOKEN)?.value as string;

        const res = NextResponse.next();
        res.cookies.delete(Constants.JWT_TOKEN);
        res.cookies.set({
            name: Constants.AUTH_TOKEN_NAME,
            value: jwt,
            expires: Date.now() + 1000 * 60 * 15, // 15 minutes as default set from appwrite
            secure: true,
            httpOnly: true,
        });

        return res;
    } else if (isRouteProtected(path) && !xAuthToken) return unsetAuthResponse();

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/:path*",
};
