import { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserSignalsByIdQuery } from '../features/signalsListApi';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../app/services/FirebaseAuth'
import { activate, setSentSignalId } from '../features/dashboardSlice';
import { SignalsList, Signal, GeoCodes } from '../app/model';
import { useGeolocated } from "react-geolocated";
import { doc, setDoc } from "@firebase/firestore";
import { db } from '../dataLayer/FirestoreInit';
import axios from 'axios';

let sosTimer: any;
const server_dev_url:string = 'http://localhost:3002/sms';
const server_prod_url:string = 'https://twilio-node-server.onrender.com/sms'

/** class for signal sent to db  */
class SosSignal {
    id: string;
    uid: string | undefined;
    createdAt: Date | string;
    geolocation: GeoCodes;
    signalType: string | undefined;

    constructor(id: string, uid: string, createdAt: Date | string, geolocation: GeoCodes, signalType: string | undefined) {
        this.id = id;
        this.uid = uid;
        this.createdAt = createdAt;
        this.geolocation = geolocation;
        this.signalType = signalType;
    }
}

/* class for signal sent to twilio server */
class SmsSignal {
    message:string | undefined;
    senderName: string | undefined | null;
    geolocation: GeoCodes;
    recipient: string;
    signalId: string;
    signalType: string;

    constructor( message:string |undefined,
        senderName: string | undefined | null,
        geolocation: GeoCodes,
        recipient: string, signalId: string, signalType:string){
            this.message = message;
            this.senderName = senderName;
            this.geolocation = geolocation;
            this.recipient = recipient;
            this.signalId = signalId;
            this.signalType = signalType;
        }
}




const Dashboard = () => {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const activeSos = useSelector((state: any) => state.dashboard.activeSos);
    const sentSignalId = useSelector((state:any)=> state.dashboard.sentSignalId);
    const [signal, setSignal] = useState<SignalsList>(); //signaltype in state will be send to twilio
    const [geolocation, setGeolocation] = useState<GeoCodes>({ lat: 0, lng: 0 })
    
    const [twilioReady, setTwilioReady] = useState<boolean>(false)

    const { data } = useFetchUserSignalsByIdQuery({ id: uid });
    
    const sosButtonRef = useRef<HTMLButtonElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    /**set default signal to be ready in state */
    useEffect(() => {
        if (user && data) {
            const default_signal: SignalsList = (data.filter((item) => item.id === "DEFAULT"))[0];
            setSignal(default_signal);
        }
    }, [user, data])

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

    /** sosButton onClick starts timer */
    function activateSosButton(e: any) {
        if (twilioReady === true) {
            setTwilioReady(false)}
        sosButtonRef.current!.classList.toggle('flash');
        cancelButtonRef.current!.classList.toggle('active');
        dispatch(activate(true)); //handles styling 
        sosTimer = setTimeout(()=>(sendSosDefault(signal)), 15 * 1000);
    }

    /* for sending signal to db */
    async function postDataToDb(signal: Signal) {
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
        //getPosition(); //not working
        if (!isGeolocationEnabled) { alert('You need to allow location permissions') }
        if (!isGeolocationAvailable) { alert('Your browser does not support geolocation') }
           if (coords) {
            let location= {lat: coords.latitude, lng: coords.longitude}
                setGeolocation((geolocation)=>({...geolocation, ...location}));
            } 
    }

    /* filter correct signal data , send ready state  */
    async function selectSosType(e: any, name: string, id: string) {
        clearTimeout(sosTimer);
        e.target.classList.toggle('selected');
        cancelButtonRef.current!.classList.toggle('active');
        const selected_signal: SignalsList = (data!.filter((item) => item.id === id))[0];
        setSignal(signal => ({ ...signal, ...selected_signal }));
        console.log('setting signal type of selected signal...');
        setTwilioReady(true);
    }

    /** send default signal if timer expires */
    async function sendSosDefault(signal:SignalsList | undefined) {
        getGeolocation();
        console.log(geolocation);//debugging
        sosButtonRef.current!.classList.toggle('flash')
        cancelButtonRef.current!.classList.toggle('active');
        console.log('sending default sos signal....')
        setTwilioReady(true);
    }

    /** for posting to twilio-server and sending SMS */
    async function twilioMessage(sms_signal:SignalsList | undefined) {
        sms_signal?.recipients.forEach((recipient)=>{
            let sendMe = new SmsSignal(sms_signal.presetMsg, user?.displayName, geolocation, recipient, sentSignalId, sms_signal.name);
            console.log(sms_signal.name);

            try {
                   axios.post(server_prod_url, {
                       message: sendMe.message, //extracted from signalsList object
                       geolocation: geolocation, 
                       senderName: sendMe.senderName,
                       recipient: sendMe.recipient,
                       signalId: sendMe.signalId,
                       signalType: sendMe.signalType 
                   }).then((res) => { console.log(res) })
                 
       
               } catch (err: any) {
                   alert(err.message);
               } 
            })
            
console.log('setting twilioready to false');
            setTwilioReady(false);
            dispatch(activate(false)); 
    }

    function cancelSos(e: any) {
        clearTimeout(sosTimer);
        dispatch(activate(false));
        sosButtonRef.current!.classList.toggle('flash')
        cancelButtonRef.current!.classList.toggle('active');
        alert('cancelling sos...')
        setTwilioReady(false);
        //clear watchPosition // to stop tracking geolocation, not working
    }

    /** double-checking coords */
    useEffect(() => {
        if (coords) {
            setGeolocation((geolocation) => ({ ...geolocation, lat: coords.latitude, lng: coords.longitude }));
        }
    }, [coords])

    /* Making sure signal in state is ready to be fired to twilio */
    useEffect(() => {
        if(twilioReady === true){ 
            twilioMessage(signal);
            // postDataToDb(sosSignal);
        }
        else{
            console.log('twilio useEffect activated, message not ready')};
            /* for signalHistory only: */
            const sosSignal = new SosSignal(
                uuidv4(), uid, "date", geolocation, signal?.name
            );
            dispatch(setSentSignalId(sosSignal.id));
            
//eslint-disable-next-line
    },[twilioReady]);


    return (
        <div className="dashboard">
            <div className="dashboardContainer">
                <div className="sosButtonContainer">
                    <button ref={sosButtonRef} type="button" className="sosButton" id="sosButton" onClick={activateSosButton}>
                        <span>SOS</span>
                    </button>
                    <div>  <button ref={cancelButtonRef} className="cancelButton" onClick={cancelSos}>
                        <div className="div1"><span style={{ position: "relative", top: '15px' }}>CANCEL</span></div><div className="div2"></div>
                    </button></div>

                </div>
            </div>
            {     activeSos ? (<div className="activation-text">
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

                    )
            }
        </div>
    );
};

export default Dashboard;