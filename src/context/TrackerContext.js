"use client";
import { useState, createContext, useContext, useEffect } from 'react';
import { getDataFromCollection } from "../firebase/firestore/getData";
import { useAuthContext } from './AuthContext';

const TrackerContext = createContext({});

export const useTrackerContext = () => useContext(TrackerContext);

export const TrackerContextProvider = ({ children }) => {
    const [trackers, setTrackers] = useState([]);
    const {user} = useAuthContext();

    useEffect(() => {
        if (user) {
            (async () => {        
                const trackersSnapshot = await getDataFromCollection(`users/${user.uid}/trackers`);
                setTrackers(trackersSnapshot.data);
            })();
        }
    }, []);

    return (
        <TrackerContext.Provider value={{ trackers }}>
            {children}
        </TrackerContext.Provider>
    );
};