"use client";
import appwriteService from "@/appwrite/config";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/authContext";
import React, { useEffect, useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const [authStatus, setAuthStatus] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        appwriteService
            .isLoggedIn()
            .then(setAuthStatus)
            .finally(() => setLoader(false));
    }, []);

    return (
        <AuthProvider value={{ authStatus, setAuthStatus }}>
            {!loader && (
                <>
                    <Header />
                    {children}
                </>
            )}
        </AuthProvider>
    );
};

export default ProtectedLayout;
