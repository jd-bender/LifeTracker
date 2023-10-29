"use client";
import { useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { addDataWithoutId } from "../../firebase/firestore/addData.js";
import Toast from "../../ui/Toast.js";
import { blueButton, bottomRightAbsolute } from "../../ui/styles.js";

export default function AddTracker() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [submittingTracker, setSubmittingTracker] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");

    const router = useRouter();

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
                popToastMessage("success", "Tracker saved successfully!");
                resetTrackerForm();
            }
        }
    };

    const resetToast = () => {
        setToastMessage("");
        setToastSeverity("");
        setToastOpen(false);
    };

    const goToHomePage = () => {
        router.push("/");
    };

    return (
        <span className="flex items-center">
            <TextField 
                label="Tracker Name" 
                sx={{width: '20rem'}} 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                error={nameError} 
                variant="outlined" 
            />

            {
                submittingTracker ?
                    <CircularProgress />
                    :
                    <>
                        <button className={`${blueButton} ml-4`} onClick={submitTracker}>Submit</button>
                        <button className={`${blueButton} ${bottomRightAbsolute}`} onClick={goToHomePage}>Back</button>
                    </>
            }
            
            <Toast open={toastOpen} message={toastMessage} severity={toastSeverity} handleClose={resetToast} />
        </span>
    );
}