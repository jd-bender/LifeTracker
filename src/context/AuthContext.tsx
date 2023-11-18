"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { onAuthStateChanged, getAuth, Auth } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import firebase_app from "@/firebase/config";

interface AuthContextType {
    user: {
        uid: string;
    };
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth(firebase_app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <span className="grid h-screen place-items-center">
                    <CircularProgress />
                </span>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
