"use client";
import { useState, createContext, useContext, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import firebase_app from '../firebase/config';

const AuthContext = createContext({});

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
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <CircularProgress /> : children}
        </AuthContext.Provider>
    );
};