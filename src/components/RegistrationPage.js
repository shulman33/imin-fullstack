//בס׳ד
import * as React from "react";
import {useEffect, useState} from "react";
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
import BackButton from "./BackButton";
import SlidingInstructionModal from "./SlidingInstructionPopup";
import CustomMenu from "./Menu"
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

let api = 'https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/schedule-registration'
let getImgAPI = 'https://pgclq90efg.execute-api.us-east-1.amazonaws.com/beta/get-screenshot'


function RegistrationPage({logout}, props) {
    const [values, setValues] = useState({
        username: "",
        password: "",
        time: null,
        date: null,
    });


    const [crnValues, setCrnValues] = useState({
        crn1: null,
        crn2: null,
        crn3: null,
        crn4: null,
        crn5: null,
        crn6: null
    })

    const [alert, setAlert] = useState(false);

    const [imageUrl, setImageUrl] = useState('');

    const [arrived, setArrived] = useState(false);

    const [loading, setLoading] = useState(false);

    const [badAPICall, setBadAPICall] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        time: '',
        date: '',
    });

    const [registrationTime, setRegistrationTime] = useState({
        day: null,
        hour: null,
        min: null,
        second: null
    })

    useEffect(() => {
        const storedArrived = localStorage.getItem('arrived');
        const storedLoading = localStorage.getItem('loading');
        const storedImageUrl = localStorage.getItem('imageURL')
        if (storedArrived){
            setArrived(JSON.parse(storedArrived));
        }
        if (storedLoading){
            setLoading(JSON.parse(storedLoading));
        }
        if (storedImageUrl){
            setImageUrl(JSON.parse(storedImageUrl))
        }
    }, []);

    useEffect(() => {
        if (arrived){
            localStorage.setItem('arrived', JSON.stringify(arrived));
        }else{
            localStorage.removeItem('arrived');
        }
        if (loading){
            localStorage.setItem('loading', JSON.stringify(loading));
        }else{
            localStorage.removeItem('loading');
        }
        if (imageUrl){
            localStorage.setItem('imageURL', JSON.stringify(imageUrl));
        }else{
            localStorage.removeItem('imageURL');
        }
    }, [arrived, loading])


    useEffect(() => {
        const intervalId = setInterval(() => {
            // console.log("running useEffect")
            // console.log(`inside useeffect ${registrationTime.day}, ${registrationTime.hour}, ${registrationTime.min}, ${registrationTime.second}`)
            if (registrationTime.day) {
                const currentTime = new Date();
                const day = currentTime.getDate();
                const formDay = registrationTime.day;
                const hour = currentTime.getHours();
                const formHour = registrationTime.hour;
                const minute = currentTime.getMinutes();
                const formMinute = registrationTime.min;
                const second = currentTime.getSeconds();
                const formSecond = registrationTime.second;
                console.log(`System time: Hours: ${hour}, Minutes: ${minute}, Seconds: ${second} days: ${day}`)
                console.log(`Form time: Hours: ${formHour}, Minutes: ${formMinute}, Seconds: ${formSecond} days: ${formDay}`)
                if (day >= formDay && hour >= formHour && minute >= formMinute && second > formSecond) {
                    console.log("inside inner if before axios")
                    axios.get(getImgAPI + '?username=' + values.username)
                        .then(response => {
                            setImageUrl(response.data.result);
                            setAlert(false)
                            setLoading(false)
                            setArrived(true);
                            clearInterval(intervalId);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [values.username, registrationTime.day, registrationTime.hour, registrationTime.min, registrationTime.second]);

    useEffect(() => {
        console.log(`arrived: ${arrived}`)
    }, [arrived])

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
                    cron: getCron()
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
            setBadAPICall(true);
        }
    }
    useEffect(() => {
        console.log(registrationTime);
    }, [registrationTime]);

    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true);
        const date = values.date;
        const time = values.time;
        console.log(`Submitting values: ${values.username}, ${values.password}`)
        console.log(`Submitting cron value: ${getCron()}`)
        console.log(`Submitting crn values: ${crnValues.crn1}, ${crnValues.crn2}, ${crnValues.crn3}, ${crnValues.crn4}, ${crnValues.crn5}, ${crnValues.crn6}`)
        setRegistrationTime({
            day: date.getDate(),
            hour: time.getHours(),
            min: time.getMinutes(),
            second: time.getSeconds(),
        })
        callAPI().then(r => {
            if (!badAPICall){
                console.log("Succesfull call to API")
                setAlert(true);
            } else{
                console.log("Failure to call API")
                setAlert(false);
                setLoading(false);
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

    const handleCrnChange = (event) => {
        const { name, value } = event.target;
        setCrnValues({
            ...crnValues,
            [name]: value,
        });
    };


    const handleDateChange = (newValue) => {
        onChange({ target: { name: "date", value: newValue } });
    };

    const handleTimeChange = (newValue) => {
        onChange({ target: { name: "time", value: newValue } });
    };

    const hasAtLeastOneCrn = () => {
        return Object.values(crnValues).some((crn) => crn !== null && crn !== "");
    };


    const isValidForm = () => {
        const errorValues = Object.values(errors);
        const hasErrors = errorValues.some((error) => error !== '');

        const requiredFields = ['username', 'password', 'time', 'date'];
        const hasEmptyFields = requiredFields.some((field) => !values[field]);

        return !hasErrors && !hasEmptyFields && hasAtLeastOneCrn();
    };

    const getCron = () => {
        const date = values.date;
        const time = values.time;
        return `${time.getMinutes()} ${time.getHours()} ${date.getDate()} ${date.getMonth() + 1} ? 2023`;
    }

    const navigate = useNavigate();

    console.log(values)

    const goBackToForm = () => {
        setLoading(false);
        setAlert(false)
        setArrived(false)
        setRegistrationTime({
            day: 0,
            hour: 0,
            min: 0,
            second: 0
        })
        axios.delete(getImgAPI + '?number=' + values.username).then(r => {
            console.log("deleted")
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
                                        <TextField
                                            label="CRN"
                                            name="crn1"
                                            value={crnValues.crn1 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />
                                        <TextField
                                            label="CRN"
                                            name="crn2"
                                            value={crnValues.crn2 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />
                                        <TextField
                                            label="CRN"
                                            name="crn3"
                                            value={crnValues.crn3 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />
                                        <TextField
                                            label="CRN"
                                            name="crn4"
                                            value={crnValues.crn4 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />
                                        <TextField
                                            label="CRN"
                                            name="crn5"
                                            value={crnValues.crn5 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />
                                        <TextField
                                            label="CRN"
                                            name="crn6"
                                            value={crnValues.crn6 || ""}
                                            onChange={handleCrnChange}
                                            style={{width: '10vh', marginLeft: '5px', textAlign: 'center'}}
                                        />

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