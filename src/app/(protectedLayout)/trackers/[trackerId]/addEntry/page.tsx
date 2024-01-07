"use client";
import { useState, useEffect, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CircularProgress, TextField } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import { addTrackerEntry } from "@/firebase/database/actions";
import BackButton from "@/ui/BackButton";
import { useTrackerContext } from "@/context/TrackerContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Toast, { IToast } from "@/ui/Toast";

interface paramsProps {
    params: {
        trackerId: string;
    };
}

const AddEntryPage = ({ params }: paramsProps) => {
    const [count, setCount] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [money, setMoney] = useState(0);
    const [misc, setMisc] = useState("");
    const [trackerType, setTrackerType] = useState("");
    const [trackerName, setTrackerName] = useState("");
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [saving, setSaving] = useState(false);

    const { user } = useAuthContext();
    const { trackers } = useTrackerContext();
    const toast = useRef<IToast>();

    useEffect(() => {
        const selectedTracker = trackers.find(
            (tracker) => tracker.id === params.trackerId,
        );

        if (selectedTracker) {
            setTrackerType(selectedTracker.type);
            setTrackerName(selectedTracker.name);
        }
    }, [params.trackerId, trackers]);

    const clearActiveInput = () => {
        switch (trackerType) {
            case "count":
                setCount(0);
                break;
            case "time":
                setHours(0);
                setMinutes(0);
                break;
            case "money":
                setMoney(0);
                break;
            case "misc":
                setMisc("");
                break;
        }
    };

    const renderInput = (type: string) => {
        switch (type) {
            case "count":
                return (
                    <TextField
                        label="Count"
                        type="number"
                        sx={{ width: "20rem" }}
                        disabled={saving}
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        variant="outlined"
                    />
                );
            case "time":
                return (
                    <span className="flex flex-col">
                        <TextField
                            label="Hours"
                            type="number"
                            sx={{ width: "20rem" }}
                            disabled={saving}
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            variant="outlined"
                        />
                        <TextField
                            label="Minutes"
                            type="number"
                            className="mt-4"
                            sx={{ width: "20rem" }}
                            disabled={saving}
                            value={minutes}
                            onChange={(e) =>
                                setMinutes(parseInt(e.target.value))
                            }
                            variant="outlined"
                        />
                    </span>
                );
            case "money":
                return (
                    <TextField
                        label="Money"
                        type="money"
                        sx={{ width: "20rem" }}
                        disabled={saving}
                        value={money}
                        onChange={(e) => setMoney(parseFloat(e.target.value))}
                        variant="outlined"
                    />
                );
            case "misc":
                return (
                    <TextField
                        label="Misc"
                        sx={{ width: "20rem" }}
                        disabled={saving}
                        value={misc}
                        onChange={(e) => setMisc(e.target.value)}
                        variant="outlined"
                    />
                );
        }
    };

    const saveEntry = async () => {
        let contents: number | string;

        switch (trackerType) {
            case "count":
                contents = count;
                break;
            case "time":
                contents = hours * 60 + minutes;
                break;
            case "money":
                contents = money;
                break;
            case "misc":
                contents = misc;
                break;
        }

        if (contents) {
            setSaving(true);

            const { result, error } = await addTrackerEntry(
                user.uid,
                params.trackerId,
                { contents, datetime: date.unix() },
            );

            if (!error) {
                toast.current.popToastMessage(
                    "success",
                    "Entry saved successfully.",
                );
                clearActiveInput();
                setDate(dayjs());
            } else {
                toast.current.popToastMessage("error", "Something went wrong.");
            }

            setSaving(false);
        }
    };

    return (
        <span className="flex flex-col items-center">
            {trackerType ? (
                <>
                    <p className="mb-4">Add {trackerName} Entry</p>

                    <span className="flex flex-row items-center">
                        {renderInput(trackerType)}

                        <span className="ml-4">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    disabled={saving}
                                />
                            </LocalizationProvider>
                        </span>
                    </span>

                    {saving ? (
                        <CircularProgress className="mt-4" />
                    ) : (
                        <button
                            onClick={saveEntry}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-full"
                        >
                            Save
                        </button>
                    )}
                </>
            ) : (
                <CircularProgress />
            )}

            <BackButton backLocation={`trackers/${params.trackerId}`} />

            <Toast ref={toast} />
        </span>
    );
};

export default AddEntryPage;
