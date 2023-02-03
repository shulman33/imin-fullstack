import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";




export default function CancelSubscription() {
    const navigate = useNavigate();

    const backToSafety = () => {
        navigate("/bot")
    };

    const cancelSubscription = async () => {
        navigate("/")
    };

    const [email, setEmail] = useState('');

    const onChange = (e) =>{
        setEmail(e.target.value)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper sx={{height: '300px', width: '700px'}} elevation={3}>
                <Stack sx={{marginTop: '20px', marginLeft: '40px'}} direction={"row"} spacing={28}>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}} >
                        Cancel subscription
                    </Typography>
                    <Button variant="outlined" size="small" color="error">
                        Danger Zone!
                    </Button>
                </Stack>

                <Box sx={{marginTop: '40px', marginLeft: '40px'}}>
                    <Typography variant="h6">
                        To cancel your subscription, please enter the email address you used to signup below.
                    </Typography>
                    <TextField id="standard-basic" label="Email" variant="standard" onChange={onChange} sx={{width: '300px'}}/>
                </Box>


                <Stack sx={{marginTop: '40px', marginLeft: '40px'}} direction={"row"} spacing={6}>
                    <Button onClick={cancelSubscription} variant="contained" color="error">
                         Yes Cancel subscription
                    </Button>
                    <Button onClick={backToSafety} variant="contained" color="primary">
                        No back to imin
                    </Button>
                </Stack>

            </Paper>
        </Box>
    );
}