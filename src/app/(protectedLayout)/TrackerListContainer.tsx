"use client";
import { useState, ChangeEvent } from "react";
import {
    List,
    ListItem,
    Typography,
    Tooltip,
    TextField,
    Menu,
    MenuItem,
} from "@mui/material";
import Link from "next/link";
import DialogFrame from "@/ui/DialogFrame";
import { Menu as MenuIcon } from "@mui/icons-material";
import TrackerProps from "sharedTypes/trackers";

interface TrackerListProps {
    trackers: TrackerProps[];
    type: string;
}

const TrackerListContainer = ({ trackers, type }: TrackerListProps) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTrackerId, setSelectedTrackerId] = useState<string>("");
    const [selectedTrackerName, setSelectedTrackerName] = useState<string>("");
    const [trackerNameConfirmation, setTrackerNameConfirmation] =
        useState<string>("");
    const [showConfirmDeleteButton, setShowConfirmDeleteButton] =
        useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const openDeleteConfirmationDialog = (trackerId: string) => {
        const targetTracker = trackers.find(
            (tracker) => tracker.id === trackerId,
        );

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

    const handleMenu = (event, trackerId: string) => {
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
                                        <MenuIcon
                                            className="cursor-pointer"
                                            onClick={(e) =>
                                                handleMenu(e, tracker.id)
                                            }
                                        />
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
                        <MenuItem>Add Entry</MenuItem>
                        <MenuItem>
                            <Link
                                href={`/trackers/${selectedTrackerId}/entries`}
                            >
                                View Entries
                            </Link>
                        </MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem
                            onClick={() =>
                                openDeleteConfirmationDialog(selectedTrackerId)
                            }
                        >
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
