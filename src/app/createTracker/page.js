"use client";
import { useState } from "react";
import { TextField, CircularProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { addDataWithoutId } from "../../firebase/firestore/addData";
import Toast from "../../ui/Toast";
import RouteConcealer from "../../ui/RouteConcealer";
import BackButton from "../../ui/BackButton";
import { blueButton } from "../../ui/styles";

const CreateTrackerPage = () => {
    const { user } = useAuthContext();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [selectedTrackerType, setSelectedTrackerType] = useState("");
    const [selectedTrackerTypeHelpText, setSelectedTrackerTypeHelpText] = useState("");
    const [trackerTypeError, setTrackerTypeError] = useState(false);
    const [submittingTracker, setSubmittingTracker] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");

    const resetTrackerForm = () => {
        setName("");
        setSelectedTrackerType("");
        setSelectedTrackerTypeHelpText("");
    };

    const popToastMessage = (type, text) => {
        setToastSeverity(type);
        setToastMessage(text);
        setToastOpen(true);
    };
    
    const submitTracker = async () => {
        resetTrackerForm();

        if (!name.length) {
            setNameError(true);
            popToastMessage("error", "Must enter a name.");
            return;
        } else {
            setNameError(false);
        }

        if (!selectedTrackerType.length) {
            setTrackerTypeError(true);
            popToastMessage("error", "Must select a tracker type.");
            return;
        } else {
            setTrackerTypeError(false);
        }

        setSubmittingTracker(true);
        const {result, error} = await addDataWithoutId(`users/${user.uid}/trackers`, {name, type: selectedTrackerType});
        setSubmittingTracker(false);

        if (error) {
            popToastMessage("error", "Something went wrong.");
            console.error(error);
        } else {
            popToastMessage("success", "Tracker created successfully!");
            resetTrackerForm();
        }
    };

    const resetToast = () => {
        setToastMessage("");
        setToastSeverity("");
        setToastOpen(false);
    };

    const selectedTrackerTypeChanged = (event) => {
        const trackerType = event.target.value;
        setSelectedTrackerType(trackerType);

        let helpText = "";

        switch (trackerType) {
            case "count":
                helpText = "Count trackers are for tallying numbers.";
                break;
            case "time":
                helpText = "Time trackers are for tracking amount of time spent on something.";
                break;
            case "money":
                helpText = "Money trackers are for tracking financial values.";
                break;
            case "misc":
                helpText = "Misc trackers are for tracking anything else!";
                break;
        }

        setSelectedTrackerTypeHelpText(helpText);
    };

    return (
        <RouteConcealer isProtected={true} className="flex items-center">
            <div className="flex flex-col items-center space-y-8 bg-white rounded-3xl p-8">
                <Typography variant="h4">Create Tracker</Typography>
                <TextField 
                    label="Name" 
                    sx={{width: '20rem'}} 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    error={nameError} 
                    variant="outlined" 
                />

                <FormControl error={trackerTypeError}>
                    <FormLabel>Tracker Type</FormLabel>
                    <RadioGroup row value={selectedTrackerType} onChange={selectedTrackerTypeChanged}>
                        <FormControlLabel value="count" control={<Radio />} label="Count Tracker" />
                        <FormControlLabel value="time" control={<Radio />} label="Time Tracker" />
                        <FormControlLabel value="money" control={<Radio />} label="Money Tracker" />
                        <FormControlLabel value="misc" control={<Radio />} label="Misc Tracker" />
                    </RadioGroup>
                </FormControl>

                <p>{selectedTrackerTypeHelpText}</p>

                {
                    submittingTracker ?
                        <CircularProgress />
                        :
                        <>
                            <button className={`${blueButton} ml-4`} onClick={submitTracker}>Submit</button>
                            <BackButton />
                        </>
                }
            </div>

            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} handleClose={resetToast} />
        </RouteConcealer>
    );
};

export default CreateTrackerPage;