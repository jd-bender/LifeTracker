"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getUser } from "@/firebase/firestore/getData";
import { useAuthContext } from "./AuthContext";

interface userProfileDataProps {
    firstName: string;
    lastName: string;
    email: string;
};

interface UserProfileContextType {
    userProfileData: userProfileDataProps;
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export const useUserProfileContext = () => useContext(UserProfileContext);

export const UserProfileContextProvider = ({ children }) => {
    const [userProfileData, setUserProfileData] = useState<userProfileDataProps | null>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const userSnapshot = await getUser(user.uid);
            setUserProfileData(userSnapshot.profile);
        })();
    }, [user]);

    return (
        <UserProfileContext.Provider value={{ userProfileData }}>
            {children}
        </UserProfileContext.Provider>
    );
};
