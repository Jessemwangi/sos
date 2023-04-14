import { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import Timer from '../components/Timer';
import { useFetchUserSignalsByIdQuery } from '../features/signalsListApi';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../app/services/FirebaseAuth'
import { activate } from '../features/dashboardSlice';
import { SignalsList, Signal, GeoCodes } from '../app/model';


let sosTimer: any;
let default_message: string | undefined = "";
let geolocation: GeoCodes;

class SosSignal {
    id: string;
    uid: string | undefined;
    createdAt: Date | string;
    geolocation: GeoCodes;
    signalType: string;

    constructor(id: string, uid: string, createdAt: Date | string, geolocation: GeoCodes, signalType: string) {
        this.id = id;
        this.uid = uid;
        this.createdAt = createdAt;
        this.geolocation = geolocation;
        this.signalType = signalType;

    }
}

const Dashboard = () => {


    const dispatch = useDispatch();
    const activeSos = useSelector((state: any) => state.dashboard.activeSos);
    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const [objectState, setObjectState] = useState<UserSignals>([])


    type UserSignals = SignalsList[]
    const signals_Data = useFetchUserSignalsByIdQuery({ id: uid });
    const data = signals_Data.data as UserSignals;
    //console.log(data)

    //const { data, isFetching } = useFetchSignalsListByIdQuery({ id: uid });


    const sosButtonRef = useRef<HTMLButtonElement>(null);


    if (data) {
        const default_signal: SignalsList = (data.filter((item) => item.id === "DEFAULT"))[0];
        default_message = default_signal.presetMsg;
    }

    //console.log(default_message); //debugging;

    /** sosButton onClick starts timer*/
    function activateSosButton(e: any) {
        sosButtonRef.current!.classList.toggle('flash')
        dispatch(activate(true));
        sosTimer = setTimeout(sendSosDefault, 4 * 1000);

    }

    function getGeolocation() {
        if (window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => console.log(position));
            //return(position);
        } else {
            alert('Your browser does not support geolocation')
        }
    }

    /**sends default signal if timer expires */
    async function sendSosDefault() {
        getGeolocation();
        const body_params = {
            message: "",//default message

        }

        const sosSignal = new SosSignal(
            uuidv4(), uid, "", geolocation, 'Default'
        );
        //1. get users geolocation
        //2. create Signal and send to db for log (maybe this should be a class?)
        //3. compose params object with message body and recipients
        console.log('sending default sos signal....')
        try {
            const res = await fetch('./api/sms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(default_message)
            })


            const data = await res.json();
            if (data.success) { console.log('message successfully sent') }

        } catch (err: any) {
            alert(err.message);
        }

    }

    function cancelSos(e: any) {
        clearTimeout(sosTimer);
        dispatch(activate(false));
        sosButtonRef.current!.classList.toggle('flash')
        /*    e.currentTarget.classList.toggle('invisible') */
        alert('cancelling sos...')
    }

    function selectSosType(e: any) {
        //dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
        console.log('button id:', e.target.id);
    }

    useEffect(() => {
        if (activeSos === true) { console.log('detecting active button') }
    }, [activeSos])


    /*  if (isFetching) {
         return (
             <>Fetching</>
         )
     } */

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
                                <button key={item.id} onClick={(e) => selectSosType(e)}>{item.name}</button>))}
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