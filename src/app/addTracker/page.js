"use client";
import { useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { addDataWithoutId } from "../../firebase/firestore/addData.js";
import Toast from "../../ui/Toast.js";

export default function AddTracker() {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameHelperText, setNameHelperText] = useState("");
    const [submittingTracker, setSubmittingTracker] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("");

    const router = useRouter();

    const resetTrackerForm = () => {
        setName("");
        setNameError(false);
        setNameHelperText("");
    };
    
    const submitTracker = async () => {
        resetTrackerForm();

        if (typeof name !== 'string') {
            setNameError(true);
            setNameHelperText("Name can only contain alphabetical characters.");
        }

        if (nameError) {
            return;
        } else {
            setSubmittingTracker(true);
            const {result, error} = await addDataWithoutId("trackers", {name});
            setSubmittingTracker(false);

            if (error) {
                setToastMessage("Something went wrong.");
                setToastSeverity("error");
                console.error(error);
            } else {
                setToastMessage("Tracker saved successfully!");
                setToastSeverity("success");
                resetTrackerForm();
            }

            setToastOpen(true);
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
        <span className="flex">
            <TextField 
                label="Tracker Name" 
                sx={{width: '20rem'}} 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                error={nameError} 
                variant="outlined" 
                helperText={nameHelperText}
            />

            {
                submittingTracker ?
                    <CircularProgress />
                    :
                    <>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={submitTracker}>Submit</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={goToHomePage}>Back</button>
                    </>
            }
            
            <Toast open={toastOpen} message={toastMessage} handleClose={resetToast} />
        </span>
    );
}