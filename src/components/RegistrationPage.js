//בס׳ד
import {useState} from "react";
import logo from "../assests/ImIn-logos/ImIn-logos_black.png"
import '../styles/regipage.css';
import {API, Auth, graphqlOperation} from "aws-amplify";
import {createTodo} from "../graphql/mutations";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


async function createNewTodo() {
    const todo = {
        username: values.username,
        password: values.password,
        time: parseInt(time.time),
        date: parseInt(selectedDate.date),
        crn1: crnValues.crn1,
        crn2: crnValues.crn2,
        crn3: crnValues.crn3,
        crn4: crnValues.crn4,
        crn5: crnValues.crn5,
        crn6: crnValues.crn6,
    };

    return API.graphql(graphqlOperation(createTodo, {input: todo}));
}

let time
let setTime
let selectedDate
let setSelectedDate
let values
let setValues
let crnValues
let setCrnValues

function RegistrationPage({logout}) {
    [selectedDate, setSelectedDate] = useState({
        date: null,
    });
    [time, setTime] = useState({
        time: null,
    });
    [values, setValues] = useState({
        username: "",
        password: "",
        // time: "",
        // date: "",
    });
    [crnValues, setCrnValues] = useState({
        crn1: "",
        crn2: "",
        crn3: "",
        crn4: "",
        crn5: "",
        crn6: ""
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
            placeholder: "inside-track username",
            label: "Username"
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "inside-track password",
            label: "Password"
        },
        // {
        //     id: 3,
        //     name: "time",
        //     // type: "time",
        //     type: "input",
        //     label: "registration time"
        // },
        // {
        //     id: 4,
        //     name: "date",
        //     // type: "date",
        //     type: "input",
        //     label: "registration date"
        //
        // },

    ]

    const [alert, setAlert] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log('username: ' + getUsernameOrPassword('username'))
        // console.log('password: ' + getUsernameOrPassword('password'))
        // console.log('browser start time: ' + startBrowserTime())
        // console.log('registration time: ' + registrationTime())
        // console.log('crn1: ' + getCrns(1))
        // console.log('crn2: ' + getCrns(2))
        // console.log('crn3: ' + getCrns(3))
        //run()
        try{
            createNewTodo().then(r => setAlert(true))
        }catch (error) {
           console.log("didnt work")
        }

        console.log(typeof time.time)
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
            <div className="form-container">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                >
                    <img className="logo" src={logo} alt='Im In logo'/>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        {inputs.map((input =>
                                <TextField key = {input.id} {...input} value={values[input.name]} onChange = {onChange} style={{marginBottom : '10px'}}/>
                        ))}
                    </div>
                    <div>
                        <DatePicker
                            label="Registration Date"
                            renderInput={(params) => <TextField {...params}/>}
                            value={selectedDate.date}
                            onChange={(date) => setSelectedDate(date)}
                        >
                        </DatePicker>

                    </div>
                    <div>
                        <TimePicker
                            label="Registration Time"
                            value={time.time}
                            onChange={(newValue) => {
                                setTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '3vh', flexWrap: 'wrap'}}>
                        {crns.map((crn =>
                                <TextField key = {crn.id} {...crn} value={values[crn.name]} onChange = {onChange} style={{width : '10vh', marginLeft : '5px', textAlign: 'center' }}/>
                        ))}
                    </div>
                    <div style={{marginTop: '2vh'}}>
                        <Button type="submit" variant="contained" fullWidth style={{fontWeight: 'bold'}}>Submit</Button>
                    </div>
                </Box>
            </div>
        </div>

    );
}

export function getCrns(crn){
    switch (crn){
        case 1:
            return crnValues.crn1;
        case 2:
            return crnValues.crn2;
        case 3:
            return crnValues.crn3;
        case 4:
            return crnValues.crn4;
        case 5:
            return crnValues.crn5;
        case 6:
            return crnValues.crn6;
        default:
            return null;
    }
}
export function getUsernameOrPassword(p){
    if (p === 'username'){
        return values.username
    }else {
        return values.password
    }
}
// s,m,h,d,m,*
// * * * * * *
export function registrationTime(){
    return '1 ' + values.time.substring(3) + " " + values.time.substring(0,2) + " " + values.date.substring(8) + " " + values.date.substring(5,7) + " *"
}

export function startBrowserTime(){
    const intTimeArray = []

    for (let i = 0; i < values.time.length; i++){
        if (!isNaN(values.time.charAt(i))){
            intTimeArray[i] = parseInt(values.time.charAt(i));
        }
    }

    if (intTimeArray[3] === 0 && intTimeArray[4] === 0){
        intTimeArray[1] -= 1;
        intTimeArray[3] = 5;
        intTimeArray[4] = 9;
    }else if (intTimeArray[4] === 0){
        intTimeArray[3] -= 1;
        intTimeArray[4] = 9;
    }else {
        intTimeArray[4] -= 1;
    }
    const browserStartTime = intTimeArray[3].toString() + intTimeArray[4].toString() + " " + intTimeArray[0].toString() + intTimeArray[1].toString() + " ";
    return browserStartTime + values.date.substring(8) + " " + values.date.substring(5,7) + " *"
}

export default RegistrationPage;