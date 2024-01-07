"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getUserData } from "@/firebase/database/actions";
import { useAuthContext } from "./AuthContext";

interface IUserProfileData {
    firstName: string;
    lastName: string;
    email: string;
}

interface IUserProfileContext {
    userProfileData: IUserProfileData;
}

const UserProfileContext = createContext<IUserProfileContext | null>(null);

export const useUserProfileContext = () => useContext(UserProfileContext);

export const UserProfileContextProvider = ({ children }) => {
    const [userProfileData, setUserProfileData] =
        useState<IUserProfileData | null>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const userData = await getUserData(user.uid);
            setUserProfileData(userData.result);
        })();
    }, [user]);

    return (
        <UserProfileContext.Provider value={{ userProfileData }}>
            {children}
        </UserProfileContext.Provider>
    );
};
