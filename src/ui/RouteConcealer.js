"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

export default function RouteConcealer({ isProtected, className, children }) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (isProtected && !user) {
            router.push("/login");
        } else if (!isProtected && user) {
            router.push("/");
        }
    }, [isProtected, user]);

    return (
        <span className={className || ""}>
            { children }
        </span>
    );
};