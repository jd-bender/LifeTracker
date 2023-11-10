"use client";
import RouteConcealer from "../../ui/RouteConcealer";
import Link from "next/link";
import { blueButton, bottomRightAbsolute } from "../../ui/styles";
import Trackers from "./Trackers";

const HomePage = () => (
    <RouteConcealer isProtected={true}>
        <Trackers />

        <Link href="/createTracker"><button className={`${blueButton} ${bottomRightAbsolute}`}>Create Tracker</button></Link>
    </RouteConcealer>
);

export default HomePage;