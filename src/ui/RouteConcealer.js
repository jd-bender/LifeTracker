import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RouteConcealer({ isProtected, children }) {
    const { user } = useAuthContext();
    const router = useRouter();

    if (isProtected && !user) {
        router.push("/login");
    } else if (!isProtected && user) {
        router.push("/");
    }

    return (
        <>{ children }</>
    );
};