import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from "react";
import Button from '@mui/material/Button';


function BackButton(props) {

    return (
        <Button onClick={props.back} variant="contained" startIcon={<ArrowBackIcon />}>
            Make Changes
        </Button>
    );
}

export default BackButton;