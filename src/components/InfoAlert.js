import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from "@mui/material/AlertTitle";

export default function InfoAlert() {
    const [open, setOpen] = React.useState(true);

    return (
        <Collapse in={open} style={{ margin: 0, padding: 0 }}>
            <Alert
                severity="info"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{
                    mb: 0,
                    borderRadius: 0,
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                }}
            >
                <AlertTitle><strong>Heads Up!</strong></AlertTitle>
                <p>As of now ImIn only works on <strong>Chrome.</strong></p>
                <p>A screenshot of the classes you were registered for will appear after it has successfully registered you for class</p>
                <p>Please wait up until 5 seconds for the screenshot to render to the screen</p>
            </Alert>
        </Collapse>
    );

}