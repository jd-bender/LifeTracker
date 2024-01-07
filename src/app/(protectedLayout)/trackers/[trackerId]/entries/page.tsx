"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import BackButton from "@/ui/BackButton";
import { useAuthContext } from "@/context/AuthContext";
import { useTrackerContext } from "@/context/TrackerContext";
import { getTrackerEntries } from "@/firebase/database/actions";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import dayjs from "dayjs";

interface IEntry {
    contents: string;
    datetime: number;
}

const EntriesPage = ({ params }) => {
    const [entries, setEntries] = useState<IEntry[]>([]);
    const [trackerName, setTrackerName] = useState("");
    const [atLeastOneEntry, setAtLeastOneEntry] = useState(false);
    const [columnDefs] = useState<ColDef[]>([
        { headerName: "Count", field: "contents", flex: 1, resizable: false },
        {
            headerName: "Date",
            field: "datetime",
            valueFormatter: (params: ValueFormatterParams<IEntry, number>) => {
                return dayjs.unix(params.value).format("MM/DD/YYYY");
            },
            flex: 1,
            resizable: false,
        },
    ]);
    const gridRef = useRef<AgGridReact<IEntry>>(null);
    const { user } = useAuthContext();
    const { trackers } = useTrackerContext();

    useEffect(() => {
        const targetTracker = trackers.find(
            (tracker) => tracker.id === params.trackerId,
        );

        if (targetTracker) {
            setTrackerName(targetTracker.name);
        }
    }, [trackers, params.trackerId]);

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
                <span className="flex flex-col items-center">
                    <p>{trackerName} Entries</p>

                    <div className="ag-theme-quartz w-96 h-96 mt-4">
                        <AgGridReact
                            ref={gridRef}
                            columnDefs={columnDefs}
                            rowData={entries}
                        ></AgGridReact>
                    </div>
                </span>
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
