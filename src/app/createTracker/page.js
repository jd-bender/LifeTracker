"use client";
import { useState } from "react";
import { TextField, CircularProgress, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography } from "@mui/material";
import { addDataWithoutId } from "../../firebase/firestore/addData";
import Toast from "../../ui/Toast";
import RouteConcealer from "../../ui/RouteConcealer";
import BackButton from "../../ui/BackButton";
import { blueButton } from "../../ui/styles";

const CreateTrackerPage = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [selectedTaskType, setSelectedTaskType] = useState("");
    const [selectedTaskTypeHelpText, setSelectedTaskTypeHelpText] = useState("");
    const [submittingTracker, setSubmittingTracker] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");

    const resetTrackerForm = () => {
        setName("");
        setNameError(false);
    };

    const popToastMessage = (type, text) => {
        setToastSeverity(type);
        setToastMessage(text);
        setToastOpen(true);
    };
    
    const submitTracker = async () => {
        resetTrackerForm();

        if (name.length === 0) {
            setNameError(true);
            popToastMessage("error", "Must enter a name.");
            return;
        }

        if (nameError) {
            return;
        } else {
            setSubmittingTracker(true);
            const {result, error} = await addDataWithoutId("trackers", {name});
            setSubmittingTracker(false);

            if (error) {
                popToastMessage("error", "Something went wrong.");
                console.error(error);
            } else {
                popToastMessage("success", "Tracker created successfully!");
                resetTrackerForm();
            }
        }
    };

    const resetToast = () => {
        setToastMessage("");
        setToastSeverity("");
        setToastOpen(false);
    };

    const selectedTaskTypeChanged = (event) => {
        const taskType = event.target.value;
        setSelectedTaskType(taskType);

        let helpText = "";

        switch (taskType) {
            case "count":
                helpText = "Count trackers are for tracking counts of things or events, like number of water bottles drank or miles walked.";
                break;
            case "time":
                helpText = "Time trackers are for tracking how much time was given to something.";
                break;
            case "task":
                helpText = "Task trackers are for tracking repeat things that need to get done. It is either done, or it is not.";
                break;
        }

        setSelectedTaskTypeHelpText(helpText);
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

                <FormControl>
                    <FormLabel>Tracker Type</FormLabel>
                    <RadioGroup row value={selectedTaskType} onChange={selectedTaskTypeChanged}>
                        <FormControlLabel value="count" control={<Radio />} label="Count Tracker" />
                        <FormControlLabel value="time" control={<Radio />} label="Time Tracker" />
                        <FormControlLabel value="task" control={<Radio />} label="Task Tracker" />
                    </RadioGroup>
                </FormControl>

                <p>{selectedTaskTypeHelpText}</p>

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