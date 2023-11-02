"use client";
import RouteConcealer from "../ui/RouteConcealer";
import signOutFromApp from "../firebase/auth/signOut";
import Link from "next/link";

const HomePage = () => (
    <RouteConcealer isProtected={true}>
        <Link href="/viewTrackers"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Trackers</button></Link>
        <Link href="/addTracker"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mr-8">Add Tracker</button></Link>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => signOutFromApp()}>Log Out</button>
    </RouteConcealer>
);

export default HomePage;