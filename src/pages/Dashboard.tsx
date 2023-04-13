import React, { useEffect } from 'react';
import SOSButton from '../Components/SOSButton';
import SOSMenu from '../Components/SOSMenu';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { activate } from '../features/dashboardSlice';
import { useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../app/services/FirebaseAuth'
import { SignalsList } from '../app/model';


const Dashboard = () => {
    const dispatch = useDispatch();
    const activeSos = useSelector((state: any) => state.dashboard.activeSos);
    console.log(activeSos)
    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';

    const {
        data
    } = useFetchSignalsListByIdQuery({ id: uid });

    console.log('signals data', data);

    function activateSosButton(e: any) {
        e.currentTarget.classList.toggle('flash')
        dispatch(activate(true));
    }

    const sosTimer = setTimeout(() => { }, 120 * 1000);

    function cancelSos(e: any) {
        clearTimeout(sosTimer);
        dispatch(activate(false));
        /*    e.currentTarget.classList.toggle('invisible') */
        alert('cancelling sos...')
    }

    function clickHandler(e: any) {
        //dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
    }

    useEffect(() => {
        if (activeSos === true) { console.log('detecting active button') }
    }, [activeSos])



    /*   Checks on timer state, when ready fires post request to twilio server endpoint: */

    /*     fetch('/sms/messages', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify()
           }) */


    //`https://api.twilio.com/2010-04-01/Accounts/${AccountSid}/Messages.json`



    return (
        <div className="dashboard">
            <div className="sosButtonContainer">
      <SOSButton clickHandler={activateSosButton}></SOSButton>
            </div>

            {activeSos ? (<div className="activation-text">
                <span >SOS has been activated. Select emergency type : </span>
                <div className="sosMenuContainer">
                    {data ? (<SOSMenu signals={data} clickHandler={clickHandler} />) : (<></>)}
                </div>
            </div>)
                : (<></>

                )}

        </div>
    );
};

export default Dashboard;