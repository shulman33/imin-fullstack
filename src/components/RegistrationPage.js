//בס׳ד
import {useEffect, useState} from "react";
import * as React from 'react';
import logo from "../assests/ImIn-logos/ImIn-logos_black.png"
import '../styles/regipage.css';
import {Auth} from "aws-amplify";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from 'axios';
import '../aws-config';
import InvalidAlert from "./InvalidAlert";
import BackButton from "./BackButton";
import SlidingInstructionModal from "./SlidingInstructionPopup";
import CustomMenu from "./Menu"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

let api = 'https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/schedule-registration'
let getImgAPI = 'https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/get-screenshot'
let badAPICall
let setBadAPICall
let values
let setValues
let crnValues
let setCrnValues

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
                    // cron: registrationTime()
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
            setBadAPICall(true);
        }
}

function RegistrationPage({logout}, props) {
    [values, setValues] = useState({
        username: localStorage.getItem("username") || "",
        password: "",
        time: new Date(),
        date: new Date(),
    });


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

    const [alert, setAlert] = useState(false);

    const [imageUrl, setImageUrl] = useState(localStorage.getItem('imageUrl') || '');

    const [arrived, setArrived] = useState(localStorage.getItem('arrived') || false);

    const [loading, setLoading] = useState(false);

    [badAPICall, setBadAPICall] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        time: '',
        date: '',
    });

    //TODO: Make it so that any time after registration the picture is displayed
    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const hour = currentTime.getHours();
            const minute = currentTime.getMinutes();
            const second = currentTime.getSeconds();
            // if (hour === getHours() && minute === getMinutes() && second > 3) {
            //     axios.get(getImgAPI + '?username=' + values.username)
            //         .then(response => {
            //             setImageUrl(response.data.result);
            //             setAlert(false)
            //             setLoading(false)
            //             setArrived(true);
            //             clearInterval(intervalId);
            //         })
            //         .catch(error => {
            //             console.error(error);
            //         });
            // }
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        localStorage.setItem("username", values.username);
        localStorage.setItem("imageUrl", imageUrl);
        localStorage.setItem("arrived", arrived);
    }, [values.username, imageUrl, arrived]);




    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log('registration time: ' + registrationTime())
        callAPI().then(r => {
            if (!badAPICall){
                setAlert(true);
                setLoading(true);
                console.log("Schedule API status code = " + r.body.statusCode)
            }
        })

    }

    const onChange = (event) => {
        const regex800 = /^[89]\d{8}$/;
        const pinRegex = /^(?!(\d)\1+$)\d{6}$/;
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });

        setCrnValues({
            ...crnValues,
            [name]: value,
        });

        let errorMessage = '';

        if (name === 'username') {
            if (!value) {
                errorMessage = 'Username is required.';
            }else if (!regex800.test(value)) {
                errorMessage = 'Invalid 800 number';
            }
        } else if (name === 'password') {
            if (!value) {
                errorMessage = 'Password is required.';
            } else if (!pinRegex.test(value)) {
                errorMessage = 'Pin must be at least 6 digits and no characters.';
            }
        } else if (name === 'time') {
            if (!value) {
                errorMessage = 'Time is required.';
            }
        } else if (name === 'date') {
            if (!value) {
                errorMessage = 'Date is required.';
            }
        }
        setErrors({
            ...errors,
            [name]: errorMessage,
        });
    };

    const handleDateChange = (newValue) => {
        onChange({ target: { name: "date", value: newValue } });
    };

    const handleTimeChange = (newValue) => {
        onChange({ target: { name: "time", value: newValue } });
    };

    const isValidForm = () => {
        const errorValues = Object.values(errors);
        const hasErrors = errorValues.some((error) => error !== '');

        const requiredFields = ['username', 'password', 'time', 'date'];
        const hasEmptyFields = requiredFields.some((field) => !values[field]);

        return !hasErrors && !hasEmptyFields;
    };

    const navigate = useNavigate();

    console.log(values)

    const goBackToForm = () => {
        axios.delete(getImgAPI + '?number=' + values.username).then(r => {
            console.log("delete image statusCode = " + r.data.statusCode)
            setLoading(false);
            setAlert(false)
            setArrived(false)
            localStorage.clear();
            console.log("cleared local storage")
            console.log("arrived after cleared: " + localStorage.getItem('arrived'))
            console.log("image after cleared: " + localStorage.getItem('imageUrl'))
        }).catch(error => {
            console.error(error);
        });

    };

    async function handleLogout(){
        const user = await Auth.signOut();
        logout(user)
        localStorage.clear();
        await Auth.signOut()
        navigate("/")
    }

    return (
        <div>
            <CustomMenu logout={handleLogout}/>
            {alert && !badAPICall &&
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
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 30
                            }}

                        >
                            <BackButton back={goBackToForm} />
                        </Box>

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
                                    position: 'relative'

                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 30,
                                        right: 50
                                    }}

                                >
                                    <BackButton back={goBackToForm} />
                                </Box>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <div>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{
                                        '@media (max-width: 430px, max-height: 932px)': {
                                            height: '50%',
                                            width: '30%',
                                        },
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                >
                                    <div style={{marginLeft: "650px"}}>
                                        <SlidingInstructionModal />
                                    </div>

                                    <img className="logo" src={logo} alt="Im In logo" />

                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextField
                                            label="800 Number"
                                            name="username"
                                            value={values.username}
                                            onChange={onChange}
                                            error={Boolean(errors.username)}
                                            helperText={errors.username}
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <TextField
                                            label="Pin"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={onChange}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password}
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Registration Date"
                                                    name="date"
                                                    value={values.date}
                                                    onChange={handleDateChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={Boolean(errors.date)}
                                                            helperText={errors.date}
                                                            style={{ marginBottom: "10px" }}
                                                        />
                                                    )}
                                                />
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Registration Time"
                                                name="date"
                                                value={values.time}
                                                onChange={handleTimeChange}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={Boolean(errors.time)}
                                                        helperText={errors.time}
                                                        style={{ marginBottom: "10px" }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '3vh', flexWrap: 'wrap'}}>
                                        {crns.map((crn) => (
                                            <TextField key={crn.id} {...crn} value={values[crn.name]} onChange={onChange} style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}} />
                                        ))}
                                    </div>
                                    <div style={{marginTop: '2vh'}}>
                                        <Button type="submit" disabled={!isValidForm()} variant="contained" fullWidth style={{fontWeight: 'bold'}}>Submit</Button>
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

export default RegistrationPage;