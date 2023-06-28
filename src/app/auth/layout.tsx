"use client";
import { account } from "@/appwrite/config";
import { Constants } from "@/conf/constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        account
            .createJWT()
            .then(({ jwt }) => {
                setCookie(Constants.JWT_TOKEN, jwt);
                router.push("/profile");
            })
            .catch(() => {});
    }, [router]);

    return children;
};

export default AuthLayout;
