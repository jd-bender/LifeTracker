"use client";
import { useState, useEffect } from "react";
import { useTrackerContext } from "../../context/TrackerContext";
import TrackerListContainer from "./TrackerListContainer";

const Trackers = () => {
    const [countTrackers, setCountTrackers] = useState([]);
    const [timeTrackers, setTimeTrackers] = useState([]);
    const [moneyTrackers, setMoneyTrackers] = useState([]);
    const [miscTrackers, setMiscTrackers] = useState([]);
    const [atLeastOneTracker, setAtLeastOneTracker] = useState(false);

    const { trackers } = useTrackerContext();

    useEffect(() => {
        trackers.forEach((tracker) => {
            switch (tracker.type) {
                case "count":
                    setCountTrackers([...countTrackers, tracker]);
                    setAtLeastOneTracker(true);
                    break;
                case "time":
                    setTimeTrackers([...timeTrackers, tracker]);
                    setAtLeastOneTracker(true);
                    break;
                case "money":
                    setMoneyTrackers([...moneyTrackers, tracker]);
                    setAtLeastOneTracker(true);
                    break;
                case "misc":
                    setMiscTrackers([...miscTrackers, tracker]);
                    setAtLeastOneTracker(true);
                    break;
            }
        });
    }, [trackers]);

    return (
        <span className="flex space-x-4">
            {
                atLeastOneTracker ?
                    <>
                        <TrackerListContainer type="Count" trackers={countTrackers} />
                        <TrackerListContainer type="Time" trackers={timeTrackers} />
                        <TrackerListContainer type="Money" trackers={moneyTrackers} />
                        <TrackerListContainer type="Misc" trackers={miscTrackers} />
                    </>
                    :
                    <p>No trackers yet, how about you create one?</p>
            }
            
        </span>
    );
};

export default Trackers;