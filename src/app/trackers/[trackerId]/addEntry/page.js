"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useAuthContext } from "../../../../context/AuthContext";
import { addDocumentWithoutId } from "../../../../firebase/firestore/addData";

const AddEntryPage = ({ params }) => {
    const [entryContents, setEntryContents] = useState("");
    const { user } = useAuthContext();
    
    const saveEntry = async () => {
        const {result, error} = await addDocumentWithoutId(`users/${user.uid}/trackers/${params.trackerId}/entries`, {contents: entryContents});
    };

    return (
        <>
            <TextField label="Entry Contents" sx={{width: '20rem'}} onChange={(e) => setEntryContents(e.target.value)} variant="outlined" />
            <button onClick={saveEntry}>Save</button>
        </>
    );
};

export default AddEntryPage;