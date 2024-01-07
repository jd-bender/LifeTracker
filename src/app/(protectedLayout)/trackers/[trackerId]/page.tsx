"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTrackerContext } from "@/context/TrackerContext";
import BackButton from "@/ui/BackButton";

interface IParams {
    params: {
        trackerId: string;
    };
}

const TrackerPage = ({ params }: IParams) => {
    const [trackerName, setTrackerName] = useState("");
    const { trackers } = useTrackerContext();

    useEffect(() => {
        const targetTracker = trackers.find(
            (tracker) => tracker.id === params.trackerId,
        );

        if (targetTracker) {
            setTrackerName(targetTracker.name);
        }
    }, [trackers, params.trackerId]);

    const openEditTrackerDialog = () => {};

    return (
        <span className="flex flex-col items-center">
            <p>{trackerName}</p>

            <span className="flex mt-4">
                <Link href={`/trackers/${params.trackerId}/entries`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        View Entries
                    </button>
                </Link>
                <Link href={`/trackers/${params.trackerId}/addEntry`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mr-2 rounded-full">
                        Add Entry
                    </button>
                </Link>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={openEditTrackerDialog}
                >
                    Edit Name
                </button>
            </span>

            <BackButton />
        </span>
    );
};

export default TrackerPage;
