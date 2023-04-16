import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import {Amplify, Auth} from "aws-amplify";
import cognitoConfig from "../cognito-config";

const ForgotPassword = () => {
    const navigate = useNavigate();
    try {
        Amplify.configure(cognitoConfig);
    } catch (error) {
        console.log(error)
    }

    const forgotPassword = async (e) => {
        e.preventDefault();
        Auth.forgotPassword(email)
            .then((data) => {
                console.log(data)
                alert("Verification code sent to your email")
                setShowVerificationForm(true)
            })
            .catch((err) => console.log(err));
    }

    const confirmForgotPassword = async (e) => {
        e.preventDefault();
        Auth.forgotPasswordSubmit(email, verificationCode, newPassword)
            .then((data) => {
                console.log(data)
                alert("Password reset successfully")
                navigate("/login")
            })
            .catch((err) => console.log(err));
    }

    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showVerificationForm, setShowVerificationForm] = useState(false);

    return (
        <Container maxWidth="xs">
            {!showVerificationForm ? (
                <Box
                    component="form"
                    onSubmit={forgotPassword}
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send Verification Code
                    </Button>
                </Box>
            ) : (
                <Box
                    component="form"
                    onSubmit={confirmForgotPassword}
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="verificationCode"
                        label="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ForgotPassword;
