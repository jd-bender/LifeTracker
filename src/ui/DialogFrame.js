import { Dialog, DialogTitle } from "@mui/material";

const DialogFrame = ({handleClose, open, title, children}) => {
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>

            {children}
        </Dialog>
    );
};

export default DialogFrame;