"use client";
import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { whiteBox } from "../../ui/styles";
import { blueButton } from "../../ui/styles";

const TrackerListContainer = (props) => {
    return (
        <>
            {
                props.trackers.length > 0 &&
                    <span className={`${whiteBox} shadow-xl`}>
                        <Typography variant="h6" component="div">{props.type} Trackers</Typography>

                        <List className="h-96 overflow-y-auto">
                            {
                                props.trackers.map((tracker) =>
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
            }
        </> 
    );
};

export default TrackerListContainer;