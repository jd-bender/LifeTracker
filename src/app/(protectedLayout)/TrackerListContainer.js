"use client";
import { useState } from "react";
import { List, ListItem, Typography, Tooltip, TextField } from "@mui/material";
import DialogFrame from "../../ui/DialogFrame";
import {Create as CreateIcon, Clear as ClearIcon} from '@mui/icons-material';

const TrackerListContainer = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTrackerName, setSelectedTrackerName] = useState("");
    const [trackerNameConfirmation, setTrackerNameConfirmation] = useState("");
    const [showConfirmDeleteButton, setShowConfirmDeleteButton] = useState(false);

    const openDeleteConfirmationDialog = (trackerName) => {
        setSelectedTrackerName(trackerName);
        setDialogOpen(true);
    };

    const checkForNameConfirmationMatch = (e) => {
        setTrackerNameConfirmation(e.target.value);
        setShowConfirmDeleteButton(e.target.value === selectedTrackerName);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedTrackerName("");
        setTrackerNameConfirmation("");
    };

    return (
        <>
            {
                props.trackers.length > 0 &&
                    <span className="bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center shadow-xl pb-8">
                        <Typography variant="h6" component="div">{props.type} Trackers</Typography>

                        <List className="h-96 overflow-y-auto">
                            {
                                props.trackers.map((tracker) =>
                                    <ListItem key={tracker.id} className="w-52 justify-between">
                                        <span>{tracker.name}</span> 
                                        <span>
                                            <Tooltip title="Edit" placement="top">
                                                <CreateIcon fontSize="small" className="cursor-pointer" />
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="top">
                                                <ClearIcon fontSize="small" className="cursor-pointer" onClick={() => openDeleteConfirmationDialog(tracker.name)} />
                                            </Tooltip>
                                        </span>
                                    </ListItem>
                                )
                            }
                        </List>
                    </span>
            }

            <DialogFrame title="Are you sure you want to delete this tracker?" open={dialogOpen} handleClose={handleClose}>
                <span className="mx-auto mb-4">{selectedTrackerName}</span>
                <span className="mx-auto">Enter the name of the tracker to confirm:</span>
                <span className="mx-auto my-4">
                    <TextField size="small" value={trackerNameConfirmation} onChange={(e) => checkForNameConfirmationMatch(e)}/>
                </span>
                {
                    showConfirmDeleteButton &&
                        <span className="mx-auto mb-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Confirm</button>
                        </span>
                }
            </DialogFrame>
        </> 
    );
};

export default TrackerListContainer;