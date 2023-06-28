"use client";
import { account } from "@/appwrite/config";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        account
            .deleteSessions()
            .then(() => {})
            .catch(() => {})
            .finally(() => {
                router.push("/auth/login");
            });
    }, [router]);

    return <></>;
};

export default Logout;
