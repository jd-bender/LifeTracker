"use client";
import { useState, useEffect } from "react";
import { useTrackerContext } from "@/context/TrackerContext";
import { ITracker } from "sharedInterfaces";
import TrackerListContainer from "./TrackerListContainer";

const Trackers = () => {
    const [countTrackers, setCountTrackers] = useState<ITracker[]>([]);
    const [timeTrackers, setTimeTrackers] = useState<ITracker[]>([]);
    const [moneyTrackers, setMoneyTrackers] = useState<ITracker[]>([]);
    const [miscTrackers, setMiscTrackers] = useState<ITracker[]>([]);
    const [atLeastOneTracker, setAtLeastOneTracker] = useState(false);

    const { trackers } = useTrackerContext();

    useEffect(() => {
        if (trackers?.length > 0) {
            const tempCountTrackers = [];
            const tempTimeTrackers = [];
            const tempMoneyTrackers = [];
            const tempMiscTrackers = [];

            trackers.forEach((tracker) => {
                switch (tracker.type) {
                    case "count":
                        tempCountTrackers.push(tracker);
                        setAtLeastOneTracker(true);
                        break;
                    case "time":
                        tempTimeTrackers.push(tracker);
                        setAtLeastOneTracker(true);
                        break;
                    case "money":
                        tempMoneyTrackers.push(tracker);
                        setAtLeastOneTracker(true);
                        break;
                    case "misc":
                        tempMiscTrackers.push(tracker);
                        setAtLeastOneTracker(true);
                        break;
                }
            });

            setCountTrackers(tempCountTrackers);
            setTimeTrackers(tempTimeTrackers);
            setMoneyTrackers(tempMoneyTrackers);
            setMiscTrackers(tempMiscTrackers);
        }
    }, [trackers]);

    return (
        <span className="flex flex-wrap gap-x-8 gap-y-8 justify-center">
            {atLeastOneTracker ? (
                <>
                    <TrackerListContainer
                        type="Count"
                        trackers={countTrackers}
                    />
                    <TrackerListContainer type="Time" trackers={timeTrackers} />
                    <TrackerListContainer
                        type="Money"
                        trackers={moneyTrackers}
                    />
                    <TrackerListContainer type="Misc" trackers={miscTrackers} />
                </>
            ) : (
                <p>No trackers yet, how about you create one?</p>
            )}
        </span>
    );
};

export default Trackers;
