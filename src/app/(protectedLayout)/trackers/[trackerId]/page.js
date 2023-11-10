"use client";
import { useState, useEffect } from "react";
import { useTrackerContext } from "../../../../context/TrackerContext";
import BackButton from "../../../../ui/BackButton";
import { blueButton } from "../../../../ui/styles";
import Link from "next/link";

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
                <Link href={`/trackers/${params.trackerId}/entries`}><button className={blueButton}>View Entries</button></Link>
                <Link href={`/trackers/${params.trackerId}/addEntry`}><button className={blueButton}>Add Entry</button></Link>
                <button className={blueButton} onClick={openEditTrackerDialog}>Edit Name</button>
            </span>

            <BackButton />
        </>
    );
};

export default TrackerPage;