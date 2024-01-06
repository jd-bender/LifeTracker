"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import BackButton from "@/ui/BackButton";
import { useAuthContext } from "@/context/AuthContext";
import { getTrackerEntries } from "@/firebase/database/actions";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import dayjs from "dayjs";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface EntryProps {
    contents: string;
    datetime: number;
}

const EntriesPage = ({ params }) => {
    const [entries, setEntries] = useState<EntryProps[]>([]);
    const [atLeastOneEntry, setAtLeastOneEntry] = useState(false);
    const [columnDefs] = useState<ColDef[]>([
        { headerName: "Count", field: "contents" },
        {
            headerName: "Date",
            field: "datetime",
            valueFormatter: (
                params: ValueFormatterParams<EntryProps, number>,
            ) => {
                return dayjs.unix(params.value).format("MM/DD/YYYY");
            },
        },
    ]);
    const gridRef = useRef<AgGridReact<EntryProps>>(null);
    const { user } = useAuthContext();

    useEffect(() => {
        (async () => {
            const entriesSnapshot = await getTrackerEntries(
                user.uid,
                params.trackerId,
            );

            setEntries(entriesSnapshot.result);

            if (entriesSnapshot.result.length > 0) {
                setAtLeastOneEntry(true);
            }
        })();
    }, [user.uid, params.trackerId]);

    return (
        <>
            {atLeastOneEntry ? (
                <>
                    <div
                        className="ag-theme-quartz"
                        style={{
                            height: "500px",
                            width: "600px",
                        }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            columnDefs={columnDefs}
                            rowData={entries}
                        ></AgGridReact>
                    </div>
                    {/* <List className="h-96 overflow-y-scroll">
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
                    </List> */}
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
