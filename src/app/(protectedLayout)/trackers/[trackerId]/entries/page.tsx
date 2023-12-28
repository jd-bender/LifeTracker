"use client";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
import BackButton from "@/ui/BackButton";
import { useAuthContext } from "@/context/AuthContext";
import { getDataFromCollection } from "@/firebase/firestore/getData";

interface EntryProps {
    contents: string;
};

const EntriesPage = ({ params }) => {
    const [entries, setEntries] = useState<EntryProps[] | []>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const entriesSnapshot = await getDataFromCollection(
                `users/${user.uid}/trackers/${params.trackerId}/entries`,
            );
            setEntries(entriesSnapshot.data);
        })();
    }, [user.uid, params.trackerId]);

    return (
        <>
            <List className="h-96 overflow-y-scroll">
                {entries.map((entry) => (
                    <ListItem key={entry.id}>
                        <Link
                            href={`/trackers/${params.trackerId}/entries/${entry.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48"
                        >
                            <ListItemButton>
                                <ListItemText
                                    className="text-center"
                                    primary={entry.contents}
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>

            <BackButton backLocation={`trackers/${params.trackerId}`} />
        </>
    );
};

export default EntriesPage;
