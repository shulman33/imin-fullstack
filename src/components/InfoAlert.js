import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from "@mui/material/AlertTitle";
import {Snackbar} from "@mui/material";

export default function InfoAlert() {
    const [open, setOpen] = React.useState(true);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
    <Snackbar
        open={open}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        action={
            <>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </>
        }
    >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%', fontSize: '1.1em' }}>
            <AlertTitle sx={{ fontSize: '1.3em' }}><strong>Heads Up!</strong></AlertTitle>
            <p><strong>DO NOT</strong> try to use ImIn if you are unsure of your Banner PIN. You can reset your pin
                <a href="https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu" target="_blank"> here </a>
            </p>
            <p>A screenshot of the registration page will appear after it has tried to register you for classes</p>
            <p>Please wait up until <strong>10 seconds</strong> for the screenshot to render to the screen</p>
        </Alert>
    </Snackbar>

);

}