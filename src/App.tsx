import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { selectSosUser, SignIn, SignOut } from './features/userSlice';
import { Guser } from './app/model';
import jwtDecode from 'jwt-decode';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import ManageRecipients from './pages/ManageRecipients';
import CustomeMsgs from './pages/CustomeMsgs';
import SetPinnedSignals from './pages/SetPinnedSignals';
import HowTo from './HowTo';
import AnsToSignals from './pages/AnsToSignals';
import NotFound from './pages/NotFound';
import AllSignals from './pages/AllSignals';
import SignalDetails from './pages/SignalDetails';
import CompleteReg from './Registration/CompleteReg';
import Registration from './pages/Registration';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/profile" element={<EditProfile />}> Manage Profile</Route>
      <Route path="/recipients" element={<ManageRecipients />}> Manage Recipients</Route>
      <Route path="/Customemsg" element={<CustomeMsgs />}>Customize Messages</Route>
      <Route path="/pinsignals" element={<SetPinnedSignals />}>View Recipe</Route>
      <Route path="/help" element={<HowTo />}>Help and Documentation</Route>
      <Route path="/allsignal" element={<AllSignals />}>All Signal Status</Route>
      <Route path="/signaldetails" element={<SignalDetails />}>one Signal Details</Route>
      <Route path="/replytoSignal" element={<AnsToSignals />}> </Route>
      <Route path="/regwizard" element={<CompleteReg />}>
        Initial registration step by step
      </Route>
      <Route path="/register" element={<Registration />}>
        create an account
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  useEffect(() => {
    document.title = 'SOS Help';
  }, []);

  const dispatch = useDispatch();
  const sosUser: Guser = useSelector(selectSosUser)



  useEffect(() => {
    const handleCallback = (response: any) => {
      const userSignObject: any = jwtDecode(response.credential);
      const userObject: Guser = {
        name: userSignObject.family_name + ' ' + userSignObject.given_name,
        email: userSignObject.email,
        picture: userSignObject.picture,
        iat: userSignObject.iat,
        iss: userSignObject.iss,
        jti: userSignObject.jti
      }

      dispatch(SignIn(userObject));
    }

    window.google.accounts.id.initialize({
      client_id: "127054368864-db825ognn1j3bdg4rl224ums2j7k2g07.apps.googleusercontent.com",
      callback: handleCallback
    });

    const SignInButton = document.getElementById('signInDiv')!;
    google.accounts.id.renderButton(
      SignInButton,
      {
        theme: "outline",
        size: "large",
        type: "standard"
      })
  }, [dispatch]);

  return (
    <div className="App">
      {sosUser.email ?
        (<>
          <img src={sosUser.picture} alt={sosUser.name} />
          <button id="signOutButton" onClick={() => dispatch(SignOut())}>
            Sign Out</button>
        </>)
        : (
          <div id='signInDiv'></div>
        )}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
