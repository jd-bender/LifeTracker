"use client";
import { useState, useEffect } from "react";
import { useTrackerContext } from "@/context/TrackerContext";
import TrackerProps from "sharedTypes/trackers";
import TrackerListContainer from "./TrackerListContainer";

const Trackers = () => {
    const [countTrackers, setCountTrackers] = useState<TrackerProps[] | []>([]);
    const [timeTrackers, setTimeTrackers] = useState<TrackerProps[] | []>([]);
    const [moneyTrackers, setMoneyTrackers] = useState<TrackerProps[] | []>([]);
    const [miscTrackers, setMiscTrackers] = useState<TrackerProps[] | []>([]);
    const [atLeastOneTracker, setAtLeastOneTracker] = useState(false);

    const { trackers } = useTrackerContext();

    useEffect(() => {
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
