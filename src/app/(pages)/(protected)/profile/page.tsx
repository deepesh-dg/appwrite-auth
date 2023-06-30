"use client";
import appwriteService from "@/appwrite/config";
import ProfileCard from "@/components/ProfileCard";
import { Models } from "appwrite";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser();
            if (userData) {
                setUser(userData);
            }
        })();
    }, []);

    return (
        <div className="w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6">
            <h1 className=" w-full flex items-center gap-x-4">
                <Link href={"../"}>
                    <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
                        &lt;
                    </span>
                </Link>
                <span className="text-3xl font-bold">My Account</span>
            </h1>
            {user && <ProfileCard user={user} />}
        </div>
    );
};

export default Profile;
