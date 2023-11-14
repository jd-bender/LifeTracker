"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getDataFromCollection } from "../firebase/firestore/getData";
import { useAuthContext } from "./AuthContext";

interface TrackerContextType {
    trackers: Array<{ type: string }>
};

const TrackerContext = createContext<TrackerContextType | null>(null);

export const useTrackerContext = () => useContext(TrackerContext);

export const TrackerContextProvider = ({ children }) => {
    const [trackers, setTrackers] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const trackersSnapshot = await getDataFromCollection(
                `users/${user.uid}/trackers`,
            );
            setTrackers(trackersSnapshot.data);
        })();
    }, [user.uid]);

    return (
        <TrackerContext.Provider value={{ trackers }}>
            {children}
        </TrackerContext.Provider>
    );
};
