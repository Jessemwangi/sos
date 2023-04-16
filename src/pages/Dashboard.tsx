import { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserSignalsByIdQuery } from '../features/signalsListApi';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../app/services/FirebaseAuth'
import { activate, selectSos } from '../features/dashboardSlice';
import { SignalsList, Signal, GeoCodes } from '../app/model';
import { useGeolocated } from "react-geolocated";
import { doc, setDoc } from "@firebase/firestore";
import { db } from '../dataLayer/FirestoreInit';
import Timer from '../components/Timer';
import axios from 'axios';

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
    const [signal, setSignal] = useState<SignalsList>();

    const { data } = useFetchUserSignalsByIdQuery({ id: uid });

    useEffect(() => {
        if (user && data) {
            const default_signal: SignalsList = (data.filter((item) => item.id === "DEFAULT"))[0];
            setSignal(default_signal);
        }
    }, [user, data])


    const sosButtonRef = useRef<HTMLButtonElement>(null);

    const { coords, isGeolocationAvailable, isGeolocationEnabled, getPosition } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
                timeout: 5000,
            },
            userDecisionTimeout: 5000,
            watchPosition: true,
            //suppressLocationOnMount: true
        });

    /** sosButton onClick starts timer*/
    function activateSosButton(e: any) {
        sosButtonRef.current!.classList.toggle('flash')
        dispatch(activate(true));
        sosTimer = setTimeout(sendSosDefault, 30 * 1000);
        console.log('current signal in state: ', signal)//testing
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
        //getPosition();
        if (!isGeolocationEnabled) { alert('You need to allow location permissions') }

        if (!isGeolocationAvailable) { alert('Your browser does not support geolocation') }

        if (coords) {
            let location = { lat: coords.latitude, lng: coords.longitude }
            geolocation = location;
        }
    }

    function selectSosType(e: any, name: string, id: string) {
        clearTimeout(sosTimer);
        //dispatch(selectSos(id));
        e.target.classList.toggle('selected');
        console.log('emergency name:', name);
        console.log('emergency id:', id);
        const selected_signal: SignalsList = (data!.filter((item) => item.id === id))[0];
        console.log('selected signal: ', selected_signal);

        setSignal((signal => ({ ...signal, ...selected_signal })));
        twilioMessage();

    }

    useEffect(()=>{
console.log('updated signal:', signal)
    },[signal])

    /**sends default signal if timer expires */
    async function sendSosDefault() {
        getGeolocation();
        console.log(geolocation);

        const sosSignal = new SosSignal(
            uuidv4(), uid, "date", geolocation, 'Default'
        );
        postData(sosSignal); //for signalHistory only

        console.log('sending default sos signal....')
        twilioMessage();

    }

    /**for posting to twilio-server and sending SMS */
    async function twilioMessage() {
        console.log('signal in state: ', signal)
        try {
            axios.post('http://localhost:3002/sms', {
                message: signal!.presetMsg,
                geolocation: geolocation,
                recipients: signal!.recipients
            }).then((res) => { console.log(res) })

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
                                <button key={item.id} onClick={(e) => selectSosType(e, item.name, item.id)}>{item.name}</button>))}
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