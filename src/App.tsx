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
import Layout from './Components/Layout';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import ManageRecipients from './pages/ManageRecipients';
import CustomeMsgs from './pages/CustomMsgs';
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

 

  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
