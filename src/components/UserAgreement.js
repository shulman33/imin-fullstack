import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Subscribe from "./Subscribe";




export default function UserAgreement() {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const goBack = () => {
        navigate("/")
    };



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
            <Paper sx={{height: '600px', width: '600px', overflow: 'auto',}} elevation={3}>
                <Stack sx={{marginTop: '20px', marginLeft: '40px'}} direction={"row"} spacing={28}>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}} >
                        User Agreement
                    </Typography>
                </Stack>

                <Box sx={{marginTop: '40px', marginLeft: '40px'}}>
                    <Typography variant="h6"  >
                        1. Introduction
                    </Typography>
                    <Typography variant="h7" >
                        This Terms of Service Agreement ("Agreement") is entered into by and between you, the user, and Sam Shulman,
                        the owner of the ImIn Software ("Software").
                        By using the Software, you agree to be bound by the terms and conditions outlined in this Agreement.
                        If you do not agree to these terms, you may not use the Software.
                    </Typography>
                    <Typography variant="h6"  >
                        2. Eligibility
                    </Typography>
                    <Typography variant="h7" >
                        The Software is intended for use by Yeshiva University students who are currently enrolled and seeking to register for classes at Yeshiva University.
                        By using the Software, you represent and warrant that you are a Yeshiva University student and meet this eligibility requirement.
                    </Typography>
                    <Typography variant="h6"  >
                        3. License and Restrictions
                    </Typography>
                    <Typography variant="h7" >
                        a. Modify, copy, distribute, or reverse engineer the Software;
                        b. Use the Software for any illegal or unauthorized purpose;
                        c. Use the Software in a manner that violates any applicable law or regulation;
                        d. Use the Software to infringe on the rights of others, including intellectual property rights; or
                        e. Sell, rent, lease, or sublicense the Software to any third party.
                    </Typography>
                    <Typography variant="h6"  >
                        4. Account Suspension and Termination
                    </Typography>
                    <Typography variant="h7" >
                        We reserve the right, in our sole discretion, to suspend or permanently remove your account without notice or refund for any reason,
                        including but not limited to, breach of this Agreement or any applicable law.
                    </Typography>
                    <Typography variant="h6"  >
                        5. No Guarantee and No Refunds
                    </Typography>
                    <Typography variant="h7" >
                        We do not guarantee that you will successfully register for any specific class using the Software.
                        We make no representations or warranties regarding the availability or accessibility of any particular class during the registration process.
                        We do not offer refunds under any circumstances, including but not limited to, your inability to register for a desired class, suspension or removal of your account,
                        or dissatisfaction with the Software.
                    </Typography>
                    <Typography variant="h6"  >
                        6. Governing Law and Jurisdiction
                    </Typography>
                    <Typography variant="h7" >
                        This Agreement shall be governed by and construed in accordance with the laws of the state in which Yeshiva University is located,
                        without regard to its conflict of law provisions. Any dispute arising from this Agreement shall be resolved exclusively in the courts located within that state.
                    </Typography>
                    <Typography variant="h6"  >
                        7. Amendments
                    </Typography>
                    <Typography variant="h7" >
                        We reserve the right to modify or update this Agreement at any time, and you agree to be bound by any such modifications or updates.
                        It is your responsibility to periodically review this Agreement to stay informed of any changes.
                    </Typography>
                    <Typography variant="h7" >
                        By using ImIn, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this User Agreement.
                    </Typography>
                </Box>


                <Stack sx={{marginTop: '40px', marginLeft: '40px'}} direction={"column"} spacing={6}>
                    {/*<FormControlLabel control={<Checkbox onChange={(event) => setChecked(event.target.checked)} />} label="I Agree"  />*/}
                    {/*{checked && <Subscribe />}*/}
                    <Subscribe />
                    <Button type="submit" onClick={goBack} variant="outlined" style={{fontWeight: 'bold'}} >Back</Button>
                </Stack>


            </Paper>
        </Box>
    );
}