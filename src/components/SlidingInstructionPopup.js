import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";


export default function SlidingInstructionModal() {
    const [open, setOpen] = useState(false);
    const [instructionIndex, setInstructionIndex] = useState(0);
    const [closeEnabled, setCloseEnabled] = useState(false);

    const instructions = [
        <>
            <Typography id="modal-modal-title" sx={{ mt: 2, fontWeight: 'bold', fontSize: 30 }} variant="h6" component="h2">
                Heads Up!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 25}}>
                As of now ImIn only works on Chrome.
            </Typography>
            <Typography sx={{ mt: 2 , fontSize: 25}}>
                You can run ImIn as far in advance as you wish. However, you must run ImIn at least 4 minutes before your registration time.
            </Typography>
            <Typography sx={{ mt: 2 , fontSize: 25}}>
                ImIn will register you in around 1 second after your registration time. It may take up to 12 seconds for the screenshot of your classes to show up.
            </Typography>
        </>,
        <>
            <Typography id="modal-modal-title" sx={{ mt: 2, fontWeight: 'bold', fontSize: 30 }} variant="h6" component="h2">
                Instructions:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 25 }}>
                Please enter your 800 number in the Banner ID field.
            </Typography>
            <Typography  sx={{ mt: 2, fontSize: 25 }}>
                Then enter the pin you use to log into banner in the pin field.
                If you are not sure what your pin is please reset your pin by going to
                <a href="https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu"> Banner</a> and click on RESET PIN.
                Do not try to use ImIn if you are not sure of your pin.
            </Typography>
        </>,
        <>
            <Typography id="modal-modal-title" sx={{ mt: 2, fontWeight: 'bold', fontSize: 30 }} variant="h6" component="h2">
                Instructions:
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                In the time field select the time of registration.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                In the date field select the date of registration.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                Enter up to 6 CRNs in the CRN fields.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                When you are ready press submit.
            </Typography>
        </>,
        <>
            <Typography id="modal-modal-title" sx={{ mt: 2, fontWeight: 'bold', fontSize: 30 }} variant="h6" component="h2">
                Instructions:
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                If you want to make a change just make the changes and resubmit.
            </Typography>
            <Typography sx={{ mt: 2, fontSize: 25 }}>
                A few seconds after your scheduled registration time a screenshot with all of your classes will appear on the page.
            </Typography>
        </>
    ];

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNextInstruction = () => {
        setInstructionIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % instructions.length;
            if (newIndex === instructions.length - 1) {
                setCloseEnabled(true);
            }
            return newIndex;
        });
    };

    return (
        <div>
            <IconButton onClick={handleClick} aria-label="delete">
                <HelpIcon color={"primary"} fontSize={"medium"}/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '30%',
                        height: '50%',
                    },
                }}
            >
                <DialogContent>
                    <DialogContentText>{instructions[instructionIndex]}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={!closeEnabled}>Close</Button>
                    <Button onClick={handleNextInstruction}>Next</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

