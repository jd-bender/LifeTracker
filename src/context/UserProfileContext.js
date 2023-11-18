"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getUser } from "@/firebase/firestore/getData";
import { useAuthContext } from "./AuthContext";

const UserProfileContext = createContext({});

export const useUserProfileContext = () => useContext(UserProfileContext);

export const UserProfileContextProvider = ({ children }) => {
    const [userProfileData, setUserProfileData] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const userSnapshot = await getUser(user.uid);
            setUserProfileData(userSnapshot.profile);
        })();
    }, [user.uid]);

    return (
        <UserProfileContext.Provider value={{ userProfileData }}>
            {children}
        </UserProfileContext.Provider>
    );
};
