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

        <div>
          <Routes>
            {!user && <Route path="/" element={<SignInSide loginUser={() => setUser(true)} />} />}}
            {user && <Route path="bot" element={<RegistrationPage logout={() => setUser(false)}/>} />}
            <Route path="resetpassword" element={<ForceReset setIsLoggedIn={() => setUser(true)}/>} />
            <Route path="cancelsubscription" element={<CancelSubscription/>} />
            <Route path="*" element={<Navigate to={user ? "/bot" : "/"} />} />
          </Routes>
        </div>



  );
}

export default App;
