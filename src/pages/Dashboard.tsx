import { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserSignalsByIdQuery } from '../features/signalsListApi';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../app/services/FirebaseAuth'
import { activate } from '../features/dashboardSlice';
import { SignalsList, Signal, GeoCodes } from '../app/model';
import { useGeolocated } from "react-geolocated";
import { doc, setDoc } from "@firebase/firestore";
import { db } from '../dataLayer/FirestoreInit';
import Timer from '../components/Timer';

let sosTimer: any;
let geolocation: GeoCodes = { lat: 0, lng: 0 }


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

    let default_message: string | undefined;




    const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
                timeout: 3000,
            },
            userDecisionTimeout: 5000,
            watchPosition: true,
            //suppressLocationOnMount: true
        });



    /*     useEffect(() => {
            if (activeSos) {
                getPosition()
                if (coords) {
                    let location = { lat: coords.latitude, lng: coords.longitude }
                    console.log('location variable:', location)
                    console.log('lat:', coords.latitude, 'lng:', coords.longitude);
                    setGeolocation(() => ({
                        ...location
                    }))
                }
            }
            // eslint-disable-next-line
        }, [activeSos]) */


    type UserSignals = SignalsList[]
    const signals_Data = useFetchUserSignalsByIdQuery({ id: uid });
    const data = signals_Data.data as UserSignals;
    //const { data, isFetching } = useFetchSignalsListByIdQuery({ id: uid });

    const sosButtonRef = useRef<HTMLButtonElement>(null);

    if (data) {
        const default_signal: SignalsList = (data.filter((item) => item.id === "DEFAULT"))[0];
        default_message = default_signal.presetMsg;
    }

    /** sosButton onClick starts timer*/
    function activateSosButton(e: any) {
        sosButtonRef.current!.classList.toggle('flash')
        dispatch(activate(true));
        sosTimer = setTimeout(sendSosDefault, 4 * 1000);
    }

    async function postData(signal: Signal) {
        //for sending signal to db
        console.log('check signal: ', signal);


        try {
            await setDoc(doc(db, 'signals', signal.id), {
                id: signal.id,
                uid: user?.uid,
                createdAt: signal.createdAt,
                geolocation: signal.geolocation,
                signalType: signal.signalType


            })
                .then(() => { console.log('submitted to firestore') })
        }
        catch (error: any) {
            return { error: error.message }
        }

    }

    function getGeolocation() {
        getPosition();
        console.log(coords);
        if (!isGeolocationEnabled) {
            alert('You need to allow location permissions')
        }

        if (!isGeolocationAvailable) {
            alert('Your browser does not support geolocation')

        }
        if (coords) {
            let location = { lat: coords.latitude, lng: coords.longitude }
            console.log('location variable:', location)
            console.log('lat:', coords.latitude, 'lng:', coords.longitude);
            geolocation = location;

        }
    }


    /**sends default signal if timer expires */
    //1. get users geolocation
    //2. create Signal and send to db for log (maybe this should be a class?)
    //3. compose params object with message body and recipients
    async function sendSosDefault() {
        await getGeolocation();
        console.log(geolocation);

        const body_params = {
            message: default_message,//default message in this case
            geolocation: geolocation,
            recipients: [] //default recipients

        }

        const sosSignal = new SosSignal(
            uuidv4(), uid, "date", geolocation, 'Default'
        );
        postData(sosSignal); //for signalHistory only

        console.log('sending default sos signal....')
        try {
            const res = await fetch('/api/sms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_params)
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
        //clear watchPosition
    }

    function selectSosType(e: any) {
        //dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
        console.log('button id:', e.target.id);
    }

    /*  useEffect(() => {
         if (activeSos === true) { console.log('detecting active button') }
     }, [activeSos]) */


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
                <div className="timerContainer">
                    {/*       <Timer clickHandler={cancelSos} />*/}
                </div>
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