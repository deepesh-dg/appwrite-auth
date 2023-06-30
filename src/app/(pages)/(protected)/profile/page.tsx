"use client";
import appwriteService from "@/appwrite/config";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [data, setData] = useState<Models.User<Models.Preferences> | null>(null);

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser();
            if (userData) {
                setData(userData);
            }
        })();
    }, []);

    return <div>{data?.email}</div>;
};

export default Profile;
