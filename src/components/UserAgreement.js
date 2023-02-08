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
            <Paper sx={{height: '200px', width: '600px', overflow: 'auto',}} elevation={3}>
                <Stack sx={{marginTop: '20px', marginLeft: '40px'}} direction={"row"} spacing={28}>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}} >
                        User Agreement
                    </Typography>
                </Stack>

                <Box sx={{marginTop: '40px', marginLeft: '40px'}}>
                    {/*<Typography variant="h7">*/}
                    {/*    1. Introduction*/}
                    {/*    ImIn provides a platform that allows users to connect with educational institutions and participate in classes. By accessing or using ImIn, you agree to be bound by the terms and conditions of this User Agreement.*/}

                    {/*    2. No Guarantee of Class Availability*/}
                    {/*    ImIn does not guarantee that you will be able to participate in the classes you desire. ImIn makes no representations or warranties regarding the availability of any classes offered through the platform.*/}

                    {/*    3. No Refund Policy*/}
                    {/*    ImIn does not provide refunds for any fees or charges related to classes or the use of the ImIn platform.*/}

                    {/*    4. Limitation of Liability*/}
                    {/*    ImIn shall not be liable for any damages arising from the inability of a user to participate in a class, including but not limited to any direct, indirect, incidental, special, or consequential damages.*/}

                    {/*    5. Changes to the User Agreement*/}
                    {/*    ImIn reserves the right to modify this User Agreement at any time. Continued use of the ImIn platform after any such changes shall constitute your consent to such changes.*/}

                    {/*    6. Governing Law*/}
                    {/*    This User Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which ImIn is located.*/}

                    {/*    7. Entire Agreement*/}
                    {/*    This User Agreement constitutes the entire agreement between you and ImIn and supersedes all prior and contemporaneous agreements, representations, warranties, and understandings.*/}

                    {/*    By using ImIn, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this User Agreement.*/}
                    {/*</Typography>*/}
                    <Typography variant="h6"  >
                        1. Introduction
                    </Typography>
                    <Typography variant="h7" >
                        ImIn provides a platform that allows users to connect with Yeshiva University and register for classes.
                        By accessing or using ImIn, you agree to be bound by the terms and conditions of this User Agreement.
                    </Typography>
                    <Typography variant="h6"  >
                        2. No Guarantee of Class Availability
                    </Typography>
                    <Typography variant="h7" >
                        ImIn does not guarantee that you will be able to register for the classes you desire.
                        ImIn makes no representations or warranties regarding the availability of any classes.
                    </Typography>
                    <Typography variant="h6"  >
                        3. No Refund Policy
                    </Typography>
                    <Typography variant="h7" >
                        ImIn does not provide refunds for any fees or charges related to classes or the use of the ImIn platform.
                    </Typography>
                    <Typography variant="h6"  >
                        4. Limitation of Liability
                    </Typography>
                    <Typography variant="h7" >
                        ImIn shall not be liable for any damages arising from the inability of a user to register for a class,
                        including but not limited to any direct, indirect, incidental, special, or consequential damages.
                    </Typography>
                    <Typography variant="h6"  >
                        5. Changes to the User Agreement
                    </Typography>
                    <Typography variant="h7" >
                        ImIn reserves the right to modify this User Agreement at any time.
                        Continued use of the ImIn platform after any such changes shall constitute your consent to such changes.
                    </Typography>
                    <Typography variant="h6"  >
                        6. Governing Law
                    </Typography>
                    <Typography variant="h7" >
                        This User Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which ImIn is located.
                    </Typography>
                    <Typography variant="h6"  >
                        7. Entire Agreement
                    </Typography>
                    <Typography variant="h7" >
                        This User Agreement constitutes the entire agreement between you and ImIn and supersedes all prior and contemporaneous agreements,
                        representations, warranties, and understandings.
                    </Typography>
                    <Typography variant="h7" >
                        By using ImIn, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this User Agreement.
                    </Typography>
                </Box>


                <Stack sx={{marginTop: '40px', marginLeft: '40px'}} direction={"row"} spacing={6}>
                    <FormControlLabel control={<Checkbox onChange={(event) => setChecked(event.target.checked)} />} label="I Agree"  />
                    {checked && <Subscribe />}
                    <Button type="submit" onClick={goBack} variant="outlined" style={{fontWeight: 'bold'}} >Back</Button>
                </Stack>


            </Paper>
        </Box>
    );
}