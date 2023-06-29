"use client";
import appwriteService from "@/appwrite/config";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const router = useRouter();
    const [data, setData] = useState<Models.User<Models.Preferences> | null>(null);

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser();
            if (userData) {
                setData(userData);
            } else router.push("/login");
        })();
    }, []);

    return <div>{data?.email}</div>;
};

export default Profile;
