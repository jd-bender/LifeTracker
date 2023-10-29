"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import RouteConcealer from "../ui/RouteConcealer";
import signOutFromApp from "../firebase/auth/signOut";

export default function Home() {
    const [loadingPage, setLoadingPage] = useState(false);
    const router = useRouter();

    const navigateToPage = (page) => {
        router.push(`/${page}`);
        setLoadingPage(true);
    };

    return (
        <RouteConcealer isProtected={true}>
            <span>
                {
                    loadingPage ?
                        <CircularProgress />
                        :
                        <>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigateToPage("viewTrackers")}>View Trackers</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mr-8" onClick={() => navigateToPage("addTracker")}>Add Tracker</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => signOutFromApp()}>Log Out</button>
                        </>
                }
            </span>
        </RouteConcealer>
    );
};