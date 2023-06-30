"use client";
import { Models } from "appwrite";
import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import Logo from "./Logo";
import useAuth from "@/contexts/useAuth";

type Props = {
    user?: Models.User<Models.Preferences>;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
    const { authStatus } = useAuth();

    return (
        <div className="flex gap-y-6 flex-wrap">
            {user ? (
                <div className="flex w-full gap-x-4 items-center">
                    <div className="shrink-0 w-20">
                        <Avatar img="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                    </div>
                    <div className="relative">
                        <p className="font-bold text-xl w-full mb-1">{user.name}</p>
                        <div className="text-[12px] p-0.5 inline-block rounded-md bg-gradient-to-tr from-primary to-secondary">
                            <button className="px-2 rounded-md font-bold bg-white">FREE</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-full justify-center">
                    <Logo />
                </div>
            )}
            <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
                {user ? (
                    <>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Display Name</p>
                            <p className="font-semibold">{user.name}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Email Id</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Phone Number</p>
                            <p className="font-semibold">999-888-7777</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Password</p>
                            <p className="font-semibold">********</p>
                        </div>
                    </>
                ) : (
                    <div className="text-center w-full">
                        <h1 className="font-bold text-3xl">Appwrite + NextJS 13</h1>
                    </div>
                )}
            </div>
            <div className="w-full flex justify-center">
                {user ? (
                    <Link
                        href={"/logout"}
                        className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                    >
                        Logout
                    </Link>
                ) : authStatus ? (
                    <Link
                        href={"/profile"}
                        className="rounded-xl px-6 py-3 block w-full text-center bg-primary text-white hover:bg-primary/80 duration-150 mr-4 max-w-xs"
                    >
                        Profile
                    </Link>
                ) : (
                    <>
                        <Link
                            href={"/login"}
                            className="bg-gray-200/70 rounded-xl px-6 py-3 block w-full text-center hover:bg-primary hover:text-white duration-150 mr-4"
                        >
                            Log in
                        </Link>
                        <Link
                            href={"/signup"}
                            className="bg-gray-200/70 rounded-xl px-6 py-3 block w-full text-center hover:bg-primary hover:text-white duration-150"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
