import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from "react-redux";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import  { AuthProvider} from './app/services/FirebaseContext';


import { auth } from './app/services/FirebaseAuth';
import { setUser } from './features/userSlice';
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
import CompleteReg from './pages/CompleteReg';
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
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('signed in:', uid);
      dispatch(setUser(user.email));
    } else {
      // User is signed out
    }
  });

  //const user = useSelector((state:any) => state.auth.user);

  useEffect(() => {
    document.title = 'SOS Help';
  }, []);


  return (
    <AuthProvider>
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
    </AuthProvider>
  );
}

export default App;


