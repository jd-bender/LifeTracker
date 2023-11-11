"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTrackerContext } from "../../../../context/TrackerContext";
import BackButton from "../../../../ui/BackButton";

const TrackerPage = ({ params }) => {
    const [trackerName, setTrackerName] = useState("");
    const { trackers } = useTrackerContext();
    
    useEffect(() => {
        const targetTracker = trackers.find((tracker) => tracker.id === params.trackerId);
        
        if (targetTracker) {
            setTrackerName(targetTracker.name);
        }
    }, [trackers]);

    const openEditTrackerDialog = () => {

    };
    
    return (
        <>
            <p>{trackerName} Tracker</p>

            <span className="flex">
                <Link href={`/trackers/${params.trackerId}/entries`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Entries</button>
                </Link>
                <Link href={`/trackers/${params.trackerId}/addEntry`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add Entry</button>
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={openEditTrackerDialog}>Edit Name</button>
            </span>

            <BackButton />
        </>
    );
};

export default TrackerPage;