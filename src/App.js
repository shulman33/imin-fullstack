//בס׳ד
import React, {useEffect, useState} from 'react';
import RegistrationPage from "./components/RegistrationPage";
import SignInSide from "./components/NewSignIn";
import {
  Routes,
  Route,
    Navigate
} from "react-router-dom";
import ForceReset from "./components/ForceReset";
import CancelSubscription from "./components/CancelSubscription";
import UserAgreement from "./components/UserAgreement";
import CustomerFeedbackForm from "./components/CustomerFeedbackForm";
import LandingPage from "./components/LandingPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <div>
          <Routes>
            {/*{!user && <Route path="/" element={<SignInSide loginUser={() => setUser(true)} />} />}}*/}
            {!user && <Route path="/" element={<LandingPage/>} />}}
            {user && <Route path="bot" element={<RegistrationPage logout={() => setUser(false)}/>} />}
            <Route path="/login" element={<SignInSide loginUser={() => setUser(true)} />} />
            <Route path="resetpassword" element={<ForceReset loginUser={() => setUser(true)}/>} />
            <Route path="cancelsubscription" element={<CancelSubscription logout={() => setUser(false)}/>} />
            <Route path="useragreement" element={<UserAgreement/>} />
            <Route path="feedback" element={<CustomerFeedbackForm/>} />
            <Route path="*" element={<Navigate to={user ? "/bot" : "/"} />} />
          </Routes>
        </div>
      </ThemeProvider>



  );
}

export default App;
