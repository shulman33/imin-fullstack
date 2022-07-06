//בס׳ד
import React, {useState} from 'react';
import RegistrationPage from "./components/RegistrationPage";
import {Auth} from "aws-amplify";
import SignInSide from "./components/NewSignIn";


function App() {

  async function logout(e){
    e.preventDefault();

    try{
      await Auth.signOut();
      setUser(null);
      console.log('success')
    }catch(e){
      console.error(e);
    }
  }
  const [user, setUser] = useState(null);
  return (
        <div>
            {user ?
                  <div>
                    <RegistrationPage />
                    {/*<button onClick={logout}>Logout</button>*/}
                  </div>
               :
                <SignInSide setUser={setUser}/>}
        </div>

  );
}

export default App;
