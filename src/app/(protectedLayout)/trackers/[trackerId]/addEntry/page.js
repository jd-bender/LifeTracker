"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useAuthContext } from "../../../../../context/AuthContext";
import { addDocumentWithoutId } from "../../../../../firebase/firestore/addData";
import BackButton from "../../../../../ui/BackButton";

const AddEntryPage = ({ params }) => {
    const [entryContents, setEntryContents] = useState("");
    const { user } = useAuthContext();

    const saveEntry = async () => {
        const { result, error } = await addDocumentWithoutId(
            `users/${user.uid}/trackers/${params.trackerId}/entries`,
            { contents: entryContents },
        );
    };

    return (
        <>
            <TextField
                label="Entry Contents"
                sx={{ width: "20rem" }}
                onChange={(e) => setEntryContents(e.target.value)}
                variant="outlined"
            />
            <button
                onClick={saveEntry}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                Save
            </button>
            <BackButton backLocation={`trackers/${params.trackerId}`} />
        </>
    );
};

export default AddEntryPage;
