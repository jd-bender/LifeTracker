import { useState, useEffect, SyntheticEvent } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    hideDuration?: number;
    handleClose: (event: SyntheticEvent<Element, Event>) => void;
};

const Toast = (props: ToastProps) => {
    const defaultAutoHideDuration = 3000;

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [autoHideDuration] = useState(
        defaultAutoHideDuration || props.hideDuration,
    );
    const [open, setOpen] = useState(false);

    const validateSeverity = (severity: AlertColor) => {
        return ["success", "error"].includes(severity);
    };

    useEffect(() => {
        if (props.open) {
            if (props.message.length && validateSeverity(props.severity)) {
                setSeverity(props.severity);
                setMessage(props.message);
                setOpen(true);
            }
        } else {
            setOpen(false);
        }
    }, [props.open, props.message, props.severity]);

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={props.handleClose}
        >
            <Alert
                onClose={props.handleClose}
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
