import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = (props) => {
    const defaultAutoHideDuration = 3000;

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [autoHideDuration, setAutoHideDuration] = useState(
        defaultAutoHideDuration,
    );
    const [open, setOpen] = useState(false);

    const popToastMessage = (type, text, time = defaultAutoHideDuration) => {
        setSeverity(type);
        setMessage(text);
        setAutoHideDuration(time);
        setOpen(true);
    };

    const validateSeverity = (severity) => {
        return ["success", "error"].includes(severity);
    };

    useEffect(() => {
        if (props.open) {
            if (props.message.length && validateSeverity(props.severity)) {
                popToastMessage(props.severity, props.message);
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
