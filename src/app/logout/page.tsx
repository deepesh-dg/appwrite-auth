"use client";
import appwriteService from "@/appwrite/service.client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        appwriteService.logout().then(() => {
            router.push("/auth/login");
        });
    }, [router]);

    return <></>;
};

export default Logout;
