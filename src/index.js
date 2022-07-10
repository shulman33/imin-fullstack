import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import config from './aws-exports'
import {Amplify} from "aws-amplify";
import 'semantic-ui-css/semantic.min.css'
;
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {BrowserRouter} from "react-router-dom";


Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <App />
          </LocalizationProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
