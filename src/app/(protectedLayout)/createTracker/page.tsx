"use client";
import { ChangeEvent, useState, useRef } from "react";
import {
    TextField,
    CircularProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import { addTracker } from "@/firebase/database/actions";
import Toast, { IToast } from "@/ui/Toast";
import RouteConcealer from "@/ui/RouteConcealer";
import BackButton from "@/ui/BackButton";

const CreateTrackerPage = () => {
    const { user } = useAuthContext();
    const toast = useRef<IToast>();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [selectedTrackerType, setSelectedTrackerType] = useState("");
    const [selectedTrackerTypeHelpText, setSelectedTrackerTypeHelpText] =
        useState("");
    const [trackerTypeError, setTrackerTypeError] = useState(false);
    const [submittingTracker, setSubmittingTracker] = useState(false);

    const resetTrackerForm = () => {
        setName("");
        setSelectedTrackerType("");
        setSelectedTrackerTypeHelpText("");
    };

    const submitTracker = async () => {
        if (!name.length) {
            setNameError(true);
            toast.current.popToastMessage("error", "Must enter a name.");
            return;
        } else {
            setNameError(false);
        }

        if (!selectedTrackerType.length) {
            setTrackerTypeError(true);
            toast.current.popToastMessage(
                "error",
                "Must select a tracker type.",
            );
            return;
        } else {
            setTrackerTypeError(false);
        }

        setSubmittingTracker(true);

        let { result, error } = await addTracker(
            user.uid,
            name,
            selectedTrackerType,
        );

        setSubmittingTracker(false);

        if (error) {
            toast.current.popToastMessage("error", "Something went wrong.");
            console.error(error);
        } else {
            toast.current.popToastMessage(
                "success",
                "Tracker created successfully!",
            );
            resetTrackerForm();
        }
    };

    const selectedTrackerTypeChanged = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const trackerType = event.target.value;
        setSelectedTrackerType(trackerType);

        let helpText = "";

        switch (trackerType) {
            case "count":
                helpText = "Count trackers are for tallying numbers.";
                break;
            case "time":
                helpText =
                    "Time trackers are for tracking amount of time spent on something.";
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
            <>
                <div className="flex flex-col items-center space-y-8 bg-white rounded-3xl p-8">
                    <Typography variant="h4">Create Tracker</Typography>
                    <TextField
                        label="Name"
                        sx={{ width: "20rem" }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                        variant="outlined"
                    />

                    <FormControl error={trackerTypeError}>
                        <FormLabel>Tracker Type</FormLabel>
                        <RadioGroup
                            row
                            value={selectedTrackerType}
                            onChange={selectedTrackerTypeChanged}
                        >
                            <FormControlLabel
                                value="count"
                                control={<Radio />}
                                label="Count Tracker"
                            />
                            <FormControlLabel
                                value="time"
                                control={<Radio />}
                                label="Time Tracker"
                            />
                            <FormControlLabel
                                value="money"
                                control={<Radio />}
                                label="Money Tracker"
                            />
                            <FormControlLabel
                                value="misc"
                                control={<Radio />}
                                label="Misc Tracker"
                            />
                        </RadioGroup>
                    </FormControl>

                    <p>{selectedTrackerTypeHelpText}</p>

                    {submittingTracker ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4"
                                onClick={submitTracker}
                            >
                                Submit
                            </button>
                            <BackButton />
                        </>
                    )}
                </div>

                <Toast ref={toast} />
            </>
        </RouteConcealer>
    );
};

export default CreateTrackerPage;
