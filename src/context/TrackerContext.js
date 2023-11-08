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
        (async () => {        
            const trackersData = await getDataFromCollection(`users/${user.uid}/trackers`);
            setTrackers(trackersData.data);
        })();
    }, []);

    return (
        <TrackerContext.Provider value={{ trackers }}>
            {children}
        </TrackerContext.Provider>
    );
};