"use client";
import Link from "next/link";
import RouteConcealer from "../../ui/RouteConcealer";
import { blueButton, bottomRightAbsolute } from "../../ui/styles";
import Trackers from "./Trackers";

const HomePage = () => (
    <RouteConcealer isProtected={true}>
        <Trackers />

        <Link href="/createTracker"><button className={`${blueButton} ${bottomRightAbsolute}`}>Create Tracker</button></Link>
    </RouteConcealer>
);

export default HomePage;