"use client";
import Link from "next/link";
import RouteConcealer from "../../ui/RouteConcealer";
import Trackers from "./Trackers";

const HomePage = () => (
    <RouteConcealer isProtected={true}>
        <Trackers />

        <Link href="/createTracker">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0 mb-16 mr-16">Create Tracker</button>
        </Link>
    </RouteConcealer>
);

export default HomePage;