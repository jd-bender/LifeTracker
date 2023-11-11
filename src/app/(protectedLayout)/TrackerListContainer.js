"use client";
import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const TrackerListContainer = (props) => {
    return (
        <>
            {
                props.trackers.length > 0 &&
                    <span className="bg-white flex flex-col w-1/2 h-1/2 min-w-fit rounded-3xl justify-center place-items-center shadow-xl">
                        <Typography variant="h6" component="div">{props.type} Trackers</Typography>

                        <List className="h-96 overflow-y-auto">
                            {
                                props.trackers.map((tracker) =>
                                    <ListItem key={tracker.id}>
                                        <Link href={`/trackers/${tracker.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48">
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