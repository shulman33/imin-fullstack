import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import {useState} from "react";
import {Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000080',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 576px)': { // this applies to screen widths up to 576px
        width: '90%', // adjust the width for smaller screens
        left: '5%', // adjust the position to maintain centered appearance
    },
};

export default function Help() {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={handleOpen} aria-label="delete">
                <HelpIcon color={"primary"} fontSize={"medium"}/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h9" component="h2">
                        Welcome to ImIn!
                    </Typography>
                    <Typography id="modal-modal-title" sx={{ mt: 2 }} variant="h6" component="h2">
                        Important Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                        As of now ImIn only works on Chrome.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        You can run ImIn as far in Advance as you wish. However, you must run ImIn at least 4 minutes before your registration time.
                    </Typography>
                    <Typography id="modal-modal-title" sx={{ mt: 2 }} variant="h6" component="h2">
                        Instructions:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please enter your 800 number in the Banner ID field.
                    </Typography>
                    <Typography  sx={{ mt: 2 }}>
                        Then enter the pin you use to log into banner in the pin field.
                        If you are not sure what your pin is please reset your pin by going to
                        <a href="https://banner.oci.yu.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu"> Banner</a> and click on RESET PIN.
                        Do not try to use ImIn if you are not sure of your pin.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        In the time field select the time of registration.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        In the date field select the date of registration.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Enter up to 6 CRNs in the CRN fields.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        When you are ready press submit.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        If you want to make a change just make the changes and resubmit.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        A few seconds after your scheduled registration time a screenshot with all of your classes will appear on the page.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}