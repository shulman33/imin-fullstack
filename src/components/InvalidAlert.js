import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import * as React from "react";

function InvalidAlert(props) {
    return (
        <div>
            {props.invalidPin &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    Invalid Pin
                </Alert>
            }
            {props.invalid800 &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    Invalid 800 number
                </Alert>
            }
            {props.dateIsSet &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    PLease supply a date
                </Alert>
            }
            {props.timeIsSet &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                    please supply a time
                </Alert>
            }
        </div>
    );
}

export default InvalidAlert;