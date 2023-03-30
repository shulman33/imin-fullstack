import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from "@mui/material/AlertTitle";
import {Snackbar} from "@mui/material";

export default function SuccessMessage({alert, handleCloseSnackbar}) {


    return (
        <Snackbar
            open={alert}
            autoHideDuration={10000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

        >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                <AlertTitle>Success</AlertTitle>
                <strong>The bot is running</strong> - come back later to see your classes!
            </Alert>
        </Snackbar>

    );

}