import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Subscribe from "./Subscribe";
import {Auth} from "aws-amplify";
import {useState} from "react";
import logo from '../assests/the-logo-transparent.png'
import Alert from "@mui/material/Alert";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useNavigate} from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://babylonbee.com/">
                ImIn
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Support(props){
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Contact '}
            <Link color="inherit" href="https://www.imin.site/feedback">
                Support
            </Link>{' '}
            {'for Help.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide({loginUser}) {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function login(e){
        e.preventDefault();
        try{
            const user = await Auth.signIn(username, password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED'){
                navigate("/resetpassword")
                return
            }
            loginUser(user);
            console.log('user: ' + user);
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/bot")
        }catch(e){
            console.error(e);
            setErrorMessage('Incorrect username or password');
        }
    }
    const gotoForgot = () => {
        navigate("/forgotpassword")
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(https://cms.prod.nypr.digital/images/301580/fill-640x426%7Cformat-jpeg%7Cjpegquality-80/)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img alt='ImIn Logo' src={logo} style={{width : '23vh', marginBottom : '2vh', borderRadius : '50%'}}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
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
                                onClick={login}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Subscribe />
                            <Box
                                sx={{
                                    mt: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" align="center" sx={{ mr: 2, cursor: 'pointer'}}>
                                    <Link color="inherit" onClick={gotoForgot}>
                                        Forgot Password?
                                    </Link>{' '}
                                </Typography>
                                <Support />
                            </Box>
                            <Copyright sx={{ mt: 2 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}