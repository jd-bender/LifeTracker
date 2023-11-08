"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

import BackButton from "../../ui/BackButton";
import RouteConcealer from "../../ui/RouteConcealer";
import { useAuthContext } from "../../context/AuthContext";
import { getDataFromCollection } from "../../firebase/firestore/getData";
import { blueButton } from "../../ui/styles";

const TrackersPage = () => {
    const { user } = useAuthContext();
    const [trackers, setTrackers] = useState([]);

    useEffect(() => {
        (async () => {
            const trackersData = await getDataFromCollection(`users/${user.uid}/trackers`);
            setTrackers(trackersData.data);
        })();
    }, []);
    
    return (
        <RouteConcealer isProtected={true} className="flex">
            <List className="h-96 overflow-y-scroll">
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

            <BackButton />
        </RouteConcealer>
    );
};

export default TrackersPage;