import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useDispatch, useSelector } from "react-redux";
import './App.css';

import { selectSosUser,SignIn } from './features/counter/userSlice';
import { Guser } from './app/model';
import jwtDecode from 'jwt-decode';

function App() {
  const dispatch = useDispatch();
  interface Google {
    client_id: String
    callback: () => void
  }
  const sosUser: Guser = useSelector(selectSosUser)

  const handleCallback = (response: any) => {
    console.log(response.creditial, response)
    const userSignObject = jwtDecode(response.creditial);
    dispatch(SignIn(userSignObject))
  }

  const handleSignout = () => {
    
  }
  useEffect(() => {
    google.accounts.id.initialize({
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
  }, [])
  return (
    <div className="App">
      {sosUser.email ? (<></>):(
        < div id='signInDiv'></div>)}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
