import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../assests/ImIn-logos/ImIn-logos.jpeg";
import {Auth} from "aws-amplify";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Alert from '@mui/material/Alert';
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function ForceReset({setIsLoggedIn}) {
    const [username, setUsername] = useState('')
    const [temp, setTemp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showTempPassword, setShowTempPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        Auth.signIn(username, temp)
            .then(user => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    const { requiredAttributes } = user.challengeParam;
                    Auth.completeNewPassword(
                        user,
                        newPassword,
                    ).then(user => {
                        // at this time the user is logged in if no MFA required
                        console.log(user);
                        setIsLoggedIn(user);
                        localStorage.setItem('user', JSON.stringify(user))
                        navigate("/bot")
                    }).catch(e => {
                        console.log(e);
                        setErrorMessage('Make sure you entered the same email address you used to signup. \n Make sure you entered the temporary password correctly. \n Your new password needs to contain at least one number and have a minimum of 8 characters.');
                    });
                } else {
                    // other situations
                }
            }).catch(e => {
            console.log(e);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img alt='ImIn Logo' src={logo} style={{width : '15vh', marginBottom : '2vh', borderRadius : '50%'}}/>
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {!errorMessage && <Alert severity="info">Check your email for the temporary password we sent you</Alert>}
                        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="input"
                            id="email"
                            autoComplete="current-email"
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="temp"
                            label="Temporary Password"
                            type={showTempPassword ? 'text' : 'password'}
                            id="temp"
                            autoComplete="temp-password"
                            onChange={e => setTemp(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowTempPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            onChange={e => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}


