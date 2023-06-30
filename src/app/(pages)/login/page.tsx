"use client";
import useAuth from "@/contexts/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import LoginComponent from "@/components/Login";

const Login = () => {
    const router = useRouter();

    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <></>;
    }

    return (
        <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <LoginComponent />
        </section>
    );
};

export default Login;
