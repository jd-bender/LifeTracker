"use client";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import BackButton from "../../../../../ui/BackButton";
import { useAuthContext } from "../../../../../context/AuthContext";
import { getDataFromCollection } from "../../../../../firebase/firestore/getData";
import { blueButton } from "../../../../../ui/styles";
import Link from "next/link";

const EntriesPage = ({ params }) => {
    const [entries, setEntries] = useState([]);
    const {user} = useAuthContext();

    useEffect(() => {
        (async () => {        
            const entriesSnapshot = await getDataFromCollection(`users/${user.uid}/trackers/${params.trackerId}/entries`);
            setEntries(entriesSnapshot.data);
        })();
    }, []);

    return (
        <>
            <List className="h-96 overflow-y-scroll">
                {
                    entries.map((entry) =>
                        <ListItem key={entry.id}>
                            <Link href={`/trackers/${params.trackerId}/entries/${entry.id}`} className={`${blueButton} w-48`}>
                                <ListItemButton>
                                    <ListItemText className="text-center" primary={entry.contents} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    )
                }
            </List>

            <BackButton backLocation={`trackers/${params.trackerId}`} />
        </>
    );
};

export default EntriesPage;