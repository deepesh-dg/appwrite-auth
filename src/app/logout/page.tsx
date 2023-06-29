"use client";
import appwriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        appwriteService.logout().then(() => {
            router.push("/login");
        });
    }, []);

    return <div>Logout</div>;
};

export default Logout;
