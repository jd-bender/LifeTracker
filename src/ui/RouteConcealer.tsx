"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

interface RouteType {
    isProtected: boolean,
    className?: string,
    children: JSX.Element
}

export default function RouteConcealer({isProtected, className = "", children}: RouteType) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (isProtected && !user) {
            router.push("/login");
        } else if (!isProtected && user) {
            router.push("/");
        }
    }, [isProtected, user, router]);

    return (<span className={className}>{children}</span>);
}
