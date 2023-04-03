import {AppBar, Menu, MenuItem, Modal, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/system";
import logo from "../assests/white-words-transparent.png"

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
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '16px' }} />
                    </Box>
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
                                Upper Seniors: 8:00 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Seniors: 8:30 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Juniors: 9:00 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Juniors: 9:30 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Sophomores: 9:30 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Sophomores: 9:30 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Upper Freshmen: 9:30 AM
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Lower Freshmen: 9:30 AM
                            </Typography>
                        </Box>
                    </Modal>
                    {/*<Button color="inherit" onClick={findCrns}>Find CRNs</Button>*/}
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
        </div>
    )

}