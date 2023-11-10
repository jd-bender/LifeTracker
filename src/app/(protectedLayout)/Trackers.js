"use client";
import { whiteBox } from "../../ui/styles";
import { Typography } from "@mui/material";
import { useTrackerContext } from "../../context/TrackerContext";
import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { blueButton } from "../../ui/styles";

const Trackers = () => {
    const { trackers } = useTrackerContext();

    return (
        <span className={whiteBox}>
            <Typography variant="h6" component="div">Trackers</Typography>

            <List className="h-96 overflow-y-auto">
                {
                    trackers.map((tracker) =>
                        <ListItem key={tracker.id}>
                            <Link href={`/trackers/${tracker.id}`} className={`${blueButton} w-48`}>
                                <ListItemButton>
                                    <ListItemText className="text-center" primary={tracker.name} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )
                }
            </List>
        </span>
    );
};

export default Trackers;