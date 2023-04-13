import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import Timer from '../components/Timer';
import { useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';
import { auth } from '../app/services/FirebaseAuth'
import { activate } from '../features/dashboardSlice';
import { SignalsList, Signal } from '../app/model';
import '../styles/Dashboard.css'


/**
 *    setSignal: (state: any, action) => {
            state.signal = action.payload
        },
        //fetch corresponding message and recipients from db
        //where is geolocation triggered? in Timeout function? Timer dispatches geolocation to store?
 * 
 * fetchSignalsListById: manageSignalSlice
 *   return { data: userSignals };
 * 
 ;
 *  */

let sosTimer: any;

const Dashboard = () => {
    const dispatch = useDispatch();
    const activeSos = useSelector((state: any) => state.dashboard.activeSos);
    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';

    const sosButtonRef = useRef<HTMLButtonElement>(null);

    const { data, isFetching } = useFetchSignalsListByIdQuery({ id: uid });
    //const signals = signals_Data.data as SignalsList[];
    console.log(data);

    //console.log('signals data', signals);

    function activateSosButton(e: any) {
        sosButtonRef.current!.classList.toggle('flash')
        dispatch(activate(true));
        sosTimer = setTimeout(() => { sendSosDefault() }, 120 * 1000);

    }

    function sendSosDefault() {
        console.log('sending default sos signal....')

        /*     fetch(' http://localhost:3004/sms/', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify()
               }) */


        //`https://api.twilio.com/2010-04-01/Accounts/${AccountSid}/Messages.json`


    }


    function cancelSos(e: any) {
        clearTimeout(sosTimer);
        dispatch(activate(false));
        sosButtonRef.current!.classList.toggle('flash')
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






    if (isFetching) {
        return (
            <>Fetching</>
        )
    }

    return (
        <div className="dashboard">
            <div className="dashboardContainer">

                <div className="sosButtonContainer">
                    <button ref={sosButtonRef} type="button" className="sosButton" id="sosButton" onClick={activateSosButton}>
                        <span>SOS</span>
                    </button>
                </div>
                {/*   <div className="timerContainer">
                         <Timer clickHandler={cancelSos} /> 
                </div> */}
            </div>
            {activeSos ? (<div className="activation-text">
                <span> SOS has been activated. Select emergency type : </span>

                <div className="sosMenuContainer">
                    {data ? (
                        <div className="sosMenu">
                            {data?.map((item) => (
                                <button key={item.name} onClick={clickHandler}>{item.name}</button>))}
                        </div>
                    ) : (<></>)}
                </div>
            </div>)
                : (<></>

                )}

        </div >
    );
};

export default Dashboard;