//בס׳ד
import React, {useEffect, useState} from 'react';
import RegistrationPage from "./components/RegistrationPage";
// import {Auth} from "aws-amplify";
import SignInSide from "./components/NewSignIn";
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {

  // async function logout(e){
  //   e.preventDefault();
  //
  //   try{
  //     await Auth.signOut();
  //     setUser(null);
  //     console.log('success')
  //   }catch(e){
  //     console.error(e);
  //   }
  // }
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  return (
        // <div>
        //     {user ?
        //           <div>
        //             <div>
        //               <MenuBar />
        //             </div>
        //             <RegistrationPage />
        //           </div>
        //        :
        //         <SignInSide setUser={setUser}/>}
        // </div>

        <div>
          <Routes>
            {!user && <Route path="/" element={<SignInSide setUser={() => setUser(true)} />} />}}
            {user && <Route path="bot" element={<RegistrationPage />} />}
            <Route path="*" element={<SignInSide />} />
          </Routes>
        </div>



  );
}

export default App;
