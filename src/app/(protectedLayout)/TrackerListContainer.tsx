"use client";
import { useState, ChangeEvent } from "react";
import { List, ListItem, Typography, Tooltip, TextField, Menu, MenuItem } from "@mui/material";
import DialogFrame from "@/ui/DialogFrame";
import { Menu as MenuIcon } from "@mui/icons-material";

type trackerType = {
    name: string;
    id: string;
};

interface TrackerProps {
    trackers: trackerType[];
    type: string;
}

const TrackerListContainer = ({ trackers, type }: TrackerProps) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTrackerId, setSelectedTrackerId] = useState<string | null>(null);
    const [selectedTrackerName, setSelectedTrackerName] = useState<string | null>(null);
    const [trackerNameConfirmation, setTrackerNameConfirmation] = useState<string | null>(null);
    const [showConfirmDeleteButton, setShowConfirmDeleteButton] =
        useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const openDeleteConfirmationDialog = (trackerId: string) => {
        const targetTracker = trackers.find((tracker) => tracker.id === trackerId);
        setSelectedTrackerName(targetTracker.name);
        setDialogOpen(true);
    };

    const checkForNameConfirmationMatch = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setTrackerNameConfirmation(e.target.value);
        setShowConfirmDeleteButton(e.target.value === selectedTrackerName);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedTrackerName("");
        setTrackerNameConfirmation("");
    };

    const handleMenu = (event, trackerId) => {
        setAnchorEl(event.currentTarget);
        setSelectedTrackerId(trackerId);
    };

    const closeMenu = () => {
        setAnchorEl(null);
        setSelectedTrackerId("");
    };

    return (
        <>
            {trackers.length > 0 && (
                <span className="bg-white flex flex-col min-w-fit rounded-3xl justify-center place-items-center shadow-xl pb-8">
                    <Typography variant="h6" component="div">
                        {type} Trackers
                    </Typography>

                    <List className="h-96 overflow-y-auto">
                        {trackers.map((tracker) => (
                            <ListItem
                                key={tracker.id}
                                className="w-52 justify-between"
                            >
                                <span>{tracker.name}</span>
                                <span>
                                    <Tooltip title="Actions" placement="top">
                                        <MenuIcon className="cursor-pointer" onClick={(e) => handleMenu(e, tracker.id)} />
                                    </Tooltip>
                                </span>
                            </ListItem>
                        ))}
                    </List>

                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        disableAutoFocusItem
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem>
                            Add Entry
                        </MenuItem>
                        <MenuItem>
                            View Entries
                        </MenuItem>
                        <MenuItem>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() =>
                            openDeleteConfirmationDialog(
                                selectedTrackerId,
                            )
                        }>
                            Delete
                        </MenuItem>
                    </Menu>
                </span>
            )}

            <DialogFrame
                title="Are you sure you want to delete this tracker?"
                open={dialogOpen}
                handleClose={handleClose}
            >
                <span className="mx-auto mb-4">{selectedTrackerName}</span>
                <span className="mx-auto">
                    Enter the name of the tracker to confirm:
                </span>
                <span className="mx-auto my-4">
                    <TextField
                        size="small"
                        value={trackerNameConfirmation}
                        onChange={(e) => checkForNameConfirmationMatch(e)}
                    />
                </span>
                {showConfirmDeleteButton && (
                    <span className="mx-auto mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Confirm
                        </button>
                    </span>
                )}
            </DialogFrame>
        </>
    );
};

export default TrackerListContainer;
