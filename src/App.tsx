import React, { useEffect } from 'react';
import { Provider, useSelector } from "react-redux";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  browserSessionPersistence,
  GoogleAuthProvider,
  OAuthCredential
} from "firebase/auth";

import Layout from './Components/Layout';
import Dashboard from './pages/Dashboard';
import ManageProfile from './pages/ManageProfile';
import ManageRecipients from './pages/ManageRecipients';
import CustomMsgs from './pages/CustomMsgs';
import SetPinnedSignals from './pages/SetPinnedSignals';
import HowTo from './pages/HowTo';
import AnsToSignals from './pages/AnsToSignals';
import NotFound from './pages/NotFound';
import AllSignals from './pages/AllSignals';
import SignalDetails from './pages/SignalHistory';
import CompleteReg from './Registration/CompleteReg';
import Registration from './Components/Registration';
import CustomSignalsView from './Components/CustomSignalsView';

import { store } from './app/store';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/profile" element={<ManageProfile />}>Manage Profile</Route>
      <Route path="/recipients" element={<ManageRecipients />}>Manage Recipients</Route>
      <Route path="/custommsg" element={<CustomMsgs />}>Customize Messages</Route>
      <Route path="/pinsignals" element={<SetPinnedSignals />}></Route>
      <Route path="/help" element={<HowTo />}>Help and Documentation</Route>
      <Route path="/allsignal" element={<AllSignals />}>All Signal Status</Route>
      <Route path="/signaldetails" element={<SignalDetails />}>one Signal Details</Route>
      <Route path="/customsignals" element={<CustomSignalsView />}></Route>
      <Route path="/replytoSignal/:signalid" element={<AnsToSignals />}> </Route>
      <Route path="/regwizard" element={<CompleteReg />}>Initial Setup</Route>
      <Route path="/register" element={<Registration />}>Create an account</Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  //const user = auth.currentUser;
  //const user = useSelector((state:any) => state.auth.user);

  useEffect(() => {
    document.title = 'SOS Help';
  }, []);



  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
