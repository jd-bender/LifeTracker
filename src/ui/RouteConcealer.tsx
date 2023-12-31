"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

interface IRoute {
    isProtected: boolean;
    className?: string;
    children: React.JSX.Element;
}

export default function RouteConcealer({
    isProtected,
    className = "",
    children,
}: IRoute) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (isProtected && !user) {
            router.push("/login");
        } else if (!isProtected && user) {
            router.push("/");
        }
    }, [isProtected, user, router]);

    return <span className={className}>{children}</span>;
}
