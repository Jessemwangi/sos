import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './app/services/FirebaseProvider';


import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ManageProfile from './pages/ManageProfile';
import ManageRecipients from './pages/ManageRecipients';
import CustomMsgs from './pages/CustomMsgs';
import AnsToSignals from './pages/AnsToSignals';
import SignalHistory from './pages/SignalHistory';
import CompleteReg from './pages/CompleteReg';
import HowTo from './pages/HowTo';
import NotFound from './pages/NotFound';
import ManageSignals from './pages/ManageSignals';
import SOS from './pages/SOS';

import { store } from './app/store';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/profile" element={<ManageProfile />}>Manage Profile</Route>
      <Route path="/recipients" element={<ManageRecipients />}>Manage Recipients</Route>
      <Route path="/custommsg" element={<CustomMsgs />}>Customize Messages</Route>
      <Route path="/signals" element={<ManageSignals />}>Manage Signals</Route>
      <Route path="/signalhistory" element={<SignalHistory />}>Signal History</Route>
      <Route path="/replytoSignal/:signalid" element={<AnsToSignals />}> </Route>
      <Route path="/regwizard" element={<CompleteReg />}>Initial Setup</Route>
      <Route path="/help" element={<HowTo />}>Help and Documentation</Route>
      <Route path="/sos/:id" element={<SOS />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Route>
  )
);

function App() {

  useEffect(() => {
    document.title = 'SOS Help';

  }, []);

  return (

    <Provider store={store}>
      <AuthProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </Provider>

  );
}

export default App;


