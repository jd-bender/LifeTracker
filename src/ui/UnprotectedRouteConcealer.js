import { useAuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function UnprotectedRouteConcealer({ children }) {
    const { user } = useAuthContext();

    return (
        user ?
            <CircularProgress />
            :
            <>{ children }</>
    );
};