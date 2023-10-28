import { Snackbar, Alert } from "@mui/material";

export default (props) => (
    <Snackbar open={props.open || false} autoHideDuration={props.hideTime || 3000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
            {props.message}
        </Alert>
    </Snackbar>
);

