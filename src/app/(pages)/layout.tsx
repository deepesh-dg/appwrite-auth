"use client";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/authContext";
import React, { useState } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const [authStatus, setAuthStatus] = useState(false);

    return (
        <AuthProvider value={{ authStatus, setAuthStatus }}>
            <Header />
            {children}
        </AuthProvider>
    );
};

export default ProtectedLayout;
