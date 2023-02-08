import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as React from "react";
import IconButton from "@mui/material/IconButton";


function BackButton(props) {

    return (

        <IconButton
            onClick={props.back}
            size="medium"
            sx={{ ml: 2 }}
        >
            <ArrowBackIcon color={"primary"} sx={{ width: 32, height: 32 }}/>
        </IconButton>
    );
}

export default BackButton;