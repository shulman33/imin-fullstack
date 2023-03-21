import {AppBar, Menu, MenuItem, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


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

    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ImIn
                    </Typography>
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
                                <Button onClick={toCancelPage} color="inherit">Cancel Subscription</Button>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                </Toolbar>
            </AppBar>
        </div>
    )

}