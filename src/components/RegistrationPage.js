//בס׳ד
import {useEffect, useState} from "react";
import logo from "../assests/ImIn-logos/ImIn-logos_black.png"
import '../styles/regipage.css';
import {Auth} from "aws-amplify";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {AppBar, CircularProgress, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import { S3 } from 'aws-sdk';
import '../aws-config';
import Help from "./HelpIcon";

let api = 'https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/schedule-registration'

async function callAPI() {
    try {
        const response = await axios.get(api, {
            params: {
                studentid: values.username,
                pin: values.password,
                crn1: crnValues.crn1,
                crn2: crnValues.crn2,
                crn3: crnValues.crn3,
                crn4: crnValues.crn4,
                crn5: crnValues.crn5,
                crn6: crnValues.crn6,
                cron: registrationTime()
            }
        });
        console.log(response);
    }catch (error) {
        console.error(error);
        setBadAPICall(true);

    }
}

let badAPICall
let setBadAPICall
let values
let setValues
let crnValues
let setCrnValues

function RegistrationPage({logout}) {
    [values, setValues] = useState({
        username: localStorage.getItem("username") || "",
        password: "",
        time: "",
        date: "",
    });

    useEffect(() => {
        localStorage.setItem("username", values.username);
    }, [values.username]);

    [crnValues, setCrnValues] = useState({
        crn1: null,
        crn2: null,
        crn3: null,
        crn4: null,
        crn5: null,
        crn6: null
    })
    const crns = [
        {
            id: "crn1",
            name: "crn1",
            type: "text",
            placeholder: "00000",
            label: "crn"
        },
        {
            id: "crn2",
            name: "crn2",
            type: "text",
            placeholder: "00000",
            label: "crn"
        },
        {
            id: "crn3",
            name: "crn3",
            type: "text",
            placeholder: "00000",
            label: "crn"
        },
        {
            id: "crn4",
            name: "crn4",
            type: "text",
            placeholder: "00000",
            label: "crn"
        },
        {
            id: "crn5",
            name: "crn5",
            type: "text",
            placeholder: "00000",
            label: "crn"
        },
        {
            id: "crn6",
            name: "crn6",
            type: "text",
            placeholder: "00000",
            label: "crn"
        }
    ]
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "8007064567",
            label: "Banner ID"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "101167",
            label: "Pin"
        },
        {
            id: 3,
            name: "time",
            type: "time",
            label: "Registration Time"
        },
        {
            id: 4,
            name: "date",
            type: "date",
            label: "Registration Date"

        },

    ]

    const [alert, setAlert] = useState(false);

    const [imageUrl, setImageUrl] = useState('');

    const [arrived, setArrived] = useState(false);

    const [loading, setLoading] = useState(false);

    [badAPICall, setBadAPICall] = useState(false);

    useEffect(() => {
        const getImage = async () => {
            const s3 = new S3();
            const params = {
                Bucket: 'registrationscreenshots',
                Key: 'screenshots/' + values.username + '_classes.png'
            };
            const data = await s3.getObject(params).promise();
            const imageUrl = URL.createObjectURL(new Blob([data.Body], { type: data.ContentType }));
            setImageUrl(imageUrl);
            console.log('image URL is ' + imageUrl);
            if (imageUrl) {
                setAlert(false)
                setLoading(false)
                setArrived(true);
            }
        };
        let intervalId;

        if (!imageUrl) {
            intervalId = setInterval(() => {
                getImage();
                console.log(arrived);
            }, 1000);  // Check for the image every 1000 milliseconds (1 seconds)
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [imageUrl, arrived]);

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log('registration time: ' + registrationTime())
        callAPI().then(r => {
            setAlert(true);
            setLoading(true);
        })

    }

    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value });
        setCrnValues({...crnValues, [e.target.name]: e.target.value});
    }
    const navigate = useNavigate();

    async function handleLogout(){
        const user = await Auth.signOut();
        logout(user)
        localStorage.clear();
        await Auth.signOut()
        navigate("/")
    }

    console.log(values)


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ImIn
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            {alert &&
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    The bot is running - come back later to see your classes
                </Alert>
            }
            {badAPICall &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    SOMETHING FAILED PLEASE TRY AGAIN
                </Alert>
            }
            <div className="form-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {console.log(`arrived: ${arrived}`)}
                {arrived ? (
                    <Box
                        sx={{
                            borderRadius: '25px',
                            width: 950,
                            height: 900,
                            backgroundColor: '#F8F8FF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={imageUrl} alt="Class screenshot" style={{width: '850px', height: '800px', borderRadius: '25px'}} />
                    </Box>
                ) : (
                    <>
                        {loading ? (
                            <Box
                                sx={{
                                    borderRadius: '25px',
                                    width: 950,
                                    height: 900,
                                    backgroundColor: '#F8F8FF',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                >
                                    <div style={{marginLeft: "650px"}}>
                                        <Help />
                                    </div>

                                    <img className="logo" src={logo} alt="Im In logo" />

                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        {inputs.map((input) => (
                                            <TextField key={input.id} {...input} value={values[input.name]} onChange={onChange} InputLabelProps={{shrink: true,}} style={{marginBottom: '10px'}} />
                                        ))}
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '3vh', flexWrap: 'wrap'}}>
                                        {crns.map((crn) => (
                                            <TextField key={crn.id} {...crn} value={values[crn.name]} onChange={onChange} style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}} />
                                        ))}
                                    </div>
                                    <div style={{marginTop: '2vh'}}>
                                        <Button type="submit" variant="contained" fullWidth style={{fontWeight: 'bold'}}>Submit</Button>
                                    </div>
                                </Box>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>

    );
}

export function registrationTime(){
    return values.time.substring(3) + " " + values.time.substring(0,2) + " " + values.date.substring(8) + " " + values.date.substring(5,7) + " ? 2023"
}


export default RegistrationPage;