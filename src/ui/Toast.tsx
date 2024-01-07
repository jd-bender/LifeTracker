import { useState, forwardRef, useImperativeHandle } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface IToastProps {
    hideDuration?: number;
}

const Toast = forwardRef((props: IToastProps, ref) => {
    const defaultAutoHideDuration = 3000;

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [autoHideDuration] = useState(
        defaultAutoHideDuration || props.hideDuration,
    );
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            popToastMessage(severity: AlertColor, message: string) {
                if (message.length && validateSeverity(severity)) {
                    setSeverity(severity);
                    setMessage(message);
                    setOpen(true);
                }
            },
        };
    });

    const validateSeverity = (severity: AlertColor) => {
        return ["success", "error"].includes(severity);
    };

    const handleClose = () => {
        setMessage("");
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
});

Toast.displayName = "Toast";

export default Toast;
export interface IToast {
    popToastMessage: (severity: AlertColor, message: string) => {};
}
