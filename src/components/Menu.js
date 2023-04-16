import {AppBar, InputAdornment, Menu, MenuItem, Modal, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {AccountCircle, Search} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import logo from "../assests/white-words-transparent.png"
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function CustomMenu({logout}){
    const [searchString, setSearchString] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {
        setSearchString(event.target.value);
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (searchString.length > 2) {
                setLoading(true);
                const response = await fetch(
                    `https://wbg1ufpg43.execute-api.us-east-1.amazonaws.com/Prod/search/?search_string=${searchString}`
                );
                const data = await response.json();
                setSearchResults(data.result);
                setLoading(false);
            } else {
                setSearchResults([]);
            }
        };


        const timeout = setTimeout(fetchResults, 500);
        return () => clearTimeout(timeout);
    }, [searchString]);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toCancelPage = () => {
        navigate("/cancelsubscription")
    };
    const toFeedbackPage = () => {
        navigate("/feedback")
    }

    const findCrns = () => {

    }

    const [timeOpen, setTimeOpen] = React.useState(false);
    const handleOpenTimes = () => setTimeOpen(true);
    const handleCloseTimes = () => setTimeOpen(false);

    return(
        <div style={{ backgroundColor: "transparent" }}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '16px' }} />
                    </Box>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <TextField
                                placeholder="Search for a class"
                                value={searchString}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    ml: 6,
                                    backgroundColor: 'rgb(82, 120, 205)',
                                    borderRadius: '4px',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end" disabled={loading}>
                                                {loading ? <CircularProgress size={20} /> : <Search />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>


                    <Button color="inherit" onClick={handleOpenTimes}>See registration times</Button>
                    <Modal
                        open={timeOpen}
                        onClose={handleCloseTimes}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Registration Times
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Seniors: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Seniors: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Juniors: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Juniors: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Sophomores: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Sophomores: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Freshmen: TBD
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Freshmen: TBD
                            </Typography>
                        </Box>
                    </Modal>
                    <React.Fragment>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AccountCircle sx={{ width: 32, height: 32 }}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Button color="inherit" onClick={logout}>Logout</Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Button color="inherit" onClick={toFeedbackPage}>Give us Feedback</Button>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Button onClick={toCancelPage} color="inherit">Cancel Subscription</Button>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
            <Box mt={0} style={{ backgroundColor: 'transparent' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={9} sm={5} md={3}>
                        {searchResults.map((result, index) => (
                            <Paper key={index} elevation={2} style={{ padding: 12, marginTop: 16 }}>
                                <Typography variant="h6">{result.course_name} {result.subject}</Typography>
                                <Typography variant="subtitle2">CRN {result.crn}</Typography>
                                <Typography variant="subtitle1">spots remaining {result.rem}</Typography>
                                <Typography variant="subtitle1">{result.day} {result.time}</Typography>
                                <Typography variant="subtitle1">{result.professor}</Typography>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Box>


        </div>
    )

}