"use client";
import appwriteService from "@/appwrite/service.client";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        appwriteService.isLoggedIn().then((status) => {
            if (status) router.push("/profile");
        });
    }, [router]);

    return children;
};

export default AuthLayout;
