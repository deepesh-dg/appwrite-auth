import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Account, Client } from "node-appwrite"; // For ServerSide Appwrite
import conf from "./conf/conf";
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

export const verifyToken = async (jwt: string) => {
    const client = new Client();
    client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId).setJWT(jwt);
    const account = new Account(client);
    try {
        const userData = await account.get();
        console.log({ userData });
        return userData;
    } catch (e) {
        return null;
    }
};

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const homeRedirectUrl = new URL(req.nextUrl);
    const loginRedirectUrl = new URL("/auth/login", req.nextUrl);

    const unsetAuthResponse = () => {
        const res = NextResponse.redirect(loginRedirectUrl);
        res.cookies.delete(Constants.AUTH_TOKEN_NAME);
        res.cookies.delete(Constants.JWT_TOKEN);
        return res;
    };

    const { value: xAuthToken } = req.cookies.get(Constants.AUTH_TOKEN_NAME) || { value: null };

    if ((xAuthToken && !(await verifyToken(xAuthToken))) || path === "/logout") return unsetAuthResponse();

    if (path.startsWith("/auth") && xAuthToken) return NextResponse.redirect(homeRedirectUrl);

    if (req.cookies.has(Constants.JWT_TOKEN)) {
        const jwt = req.cookies.get(Constants.JWT_TOKEN)?.value || "";

        const isVerified = await verifyToken(jwt);

        if (!isVerified) return unsetAuthResponse();

        const res = NextResponse.next();
        // res.cookies.delete(Constants.JWT_TOKEN);
        res.cookies.set({
            name: Constants.AUTH_TOKEN_NAME,
            value: jwt,
            expires: Date.now() + 86400,
        });

        return res;
    } else if (isRouteProtected(path)) {
        if (!xAuthToken) return NextResponse.redirect(loginRedirectUrl);
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/:path*",
};
