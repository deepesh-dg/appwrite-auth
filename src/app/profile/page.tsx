import AppwriteService from "@/appwrite/service.server";
import { cookies } from "next/headers";
import React from "react";

const Profile = async () => {
    const appwriteService = new AppwriteService(cookies());
    const userData = await appwriteService.getCurrentUser();

    if (!userData) return <div>No user</div>;

    return <div>{userData.email}</div>;
};

export default Profile;
