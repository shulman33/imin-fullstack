import React from "react";
import Button from '@mui/material/Button';
import axios from "axios";


export default function Subscribe() {
    const handleClick = async (e) => {
        axios.get('https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/go-to-checkout')
            .then(response => {
                window.location.href = response.data.body;
            })
            .catch(error => {
                console.error(error);
            });

    }
    return (
        <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,}}

        >
            Sign Up
        </Button>
    )
}