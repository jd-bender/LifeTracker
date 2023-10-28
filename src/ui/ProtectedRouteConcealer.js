import { useAuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function ProtectedRouteConcealer({ children }) {
    const { user } = useAuthContext();

    return (
        user ?
            <>{ children }</>
            :
            <CircularProgress />
    );
};