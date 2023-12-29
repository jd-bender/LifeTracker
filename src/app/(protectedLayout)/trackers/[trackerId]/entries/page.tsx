"use client";
import { useState, useEffect } from "react";
import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Link from "next/link";
import BackButton from "@/ui/BackButton";
import { useAuthContext } from "@/context/AuthContext";
import { getDataFromCollection } from "@/firebase/firestore/getData";

interface EntryProps {
    contents: string;
}

const EntriesPage = ({ params }) => {
    const [entries, setEntries] = useState<EntryProps[] | []>([]);
    const [atLeastOneEntry, setAtLeastOneEntry] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const entriesSnapshot = await getDataFromCollection(
                `users/${user.uid}/trackers/${params.trackerId}/entries`,
            );

            setEntries(entriesSnapshot.data);

            if (entriesSnapshot.data.length > 0) {
                setAtLeastOneEntry(true);
            }
        })();
    }, [user.uid, params.trackerId]);

    return (
        <>
            {atLeastOneEntry ? (
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
                </>
            ) : (
                <span className="flex flex-col items-center">
                    <p>No entries yet, how about you create one?</p>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded-full">
                        <Link href={`/trackers/${params.trackerId}/addEntry`}>
                            Add Entry
                        </Link>
                    </Button>
                </span>
            )}

            <BackButton backLocation={`trackers/${params.trackerId}`} />
        </>
    );
};

export default EntriesPage;
