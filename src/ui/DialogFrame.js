import { Dialog, DialogTitle } from "@mui/material";

const DialogFrame = (props, children) => {
    return (
        <Dialog onClose={props.handleClose} open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>

            {children}
        </Dialog>
    );
};

export default DialogFrame;