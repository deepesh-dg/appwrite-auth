"use client";
import appwriteService from "@/appwrite/config";
import useAuth from "@/contexts/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();
    const { setAuthStatus } = useAuth();

    useEffect(() => {
        appwriteService.logout().then(() => {
            setAuthStatus(false);
            router.push("/login");
        });
    }, []);

    return <div>Logout</div>;
};

export default Logout;
