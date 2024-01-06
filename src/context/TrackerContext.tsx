"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { getTrackers } from "@/firebase/database/actions";
import { useAuthContext } from "./AuthContext";

interface TrackerContextType {
    trackers: Array<{ type: string; name: string; id: string }>;
}

const TrackerContext = createContext<TrackerContextType | null>(null);

export const useTrackerContext = () => useContext(TrackerContext);

export const TrackerContextProvider = ({ children }) => {
    const [trackers, setTrackers] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const trackersSnapshot = await getTrackers(user.uid);

            setTrackers(trackersSnapshot.result);
        })();
    }, [user]);

    return (
        <TrackerContext.Provider value={{ trackers }}>
            {children}
        </TrackerContext.Provider>
    );
};
