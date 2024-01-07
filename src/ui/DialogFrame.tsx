import { SyntheticEvent } from "react";
import { Dialog, DialogTitle } from "@mui/material";

interface IDialogFrame {
    open: boolean;
    title: string;
    children: React.JSX.Element | React.JSX.Element[];
    handleClose: (event: SyntheticEvent<Element, Event>) => void;
}

const DialogFrame = ({ handleClose, open, title, children }: IDialogFrame) => {
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>

            {children}
        </Dialog>
    );
};

export default DialogFrame;
