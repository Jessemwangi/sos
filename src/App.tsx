import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useDispatch, useSelector } from "react-redux";
import './App.css';

import { selectSosUser,SignIn,SignOut } from './features/counter/userSlice';
import { Guser } from './app/model';
import jwtDecode from 'jwt-decode';

function App() {
 
  const dispatch = useDispatch();
  // interface Google {
  //   client_id: String
  //   callback: () => void
  // }
   const sosUser: Guser = useSelector(selectSosUser)
console.log(sosUser)


  useEffect(() => {
    const handleCallback = (response: any) => {
      const userSignObject:any = jwtDecode(response.credential);

  
      const userObject: Guser ={
        name: userSignObject.family_name  + ' ' + userSignObject.given_name,
        email: userSignObject.email,
        picture: userSignObject.picture,
        iat: userSignObject.iat,
        iss:userSignObject.iss,
        jti:userSignObject.jti
      }
  
      dispatch(SignIn(userObject))
    }
    window.google.accounts.id.initialize({
      client_id: "127054368864-db825ognn1j3bdg4rl224ums2j7k2g07.apps.googleusercontent.com",
      callback: handleCallback
    })
    const SignInButton = document.getElementById('signInDiv')!;
    google.accounts.id.renderButton(
      SignInButton,
      {
        theme: "outline",
        size: "large",
        type: "standard"
      })
  }, [dispatch])
  return (
    <div className="App">
      {sosUser.email ?
        (<>
          <img src={sosUser.picture} alt={sosUser.name}  />
          <button onClick={()=>dispatch(SignOut())}>
            Sign Out</button>
        </>)
        : (
        < div id='signInDiv'></div>
      )}

    </div>
  );
}

export default App;
