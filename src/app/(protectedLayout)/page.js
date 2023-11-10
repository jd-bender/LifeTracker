"use client";
import RouteConcealer from "../../ui/RouteConcealer";
import Link from "next/link";

const HomePage = () => (
    <RouteConcealer isProtected={true}>
        <Link href="/trackers"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Trackers</button></Link>
        <Link href="/createTracker"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-8 mr-8">Create Tracker</button></Link>
    </RouteConcealer>
);

export default HomePage;