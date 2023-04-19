import { useEffect, useState, useRef } from 'react';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserSignalsByIdQuery } from '../features/signalsListApi';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '../app/services/FirebaseAuth'
import { setShowMenuButtons, setSentSignalId, setDefaultSignal } from '../features/dashboardSlice';
import { SignalsList, Signal, GeoCodes } from '../app/model';
import { useGeolocated } from "react-geolocated";
import { doc, setDoc, serverTimestamp, Timestamp } from "@firebase/firestore";
import { db } from '../dataLayer/FirestoreInit';
import axios from 'axios';

let sosTimer: any;
//const server_dev_url:string = 'http://localhost:3002/sms'
const server_prod_url:string = 'https://twilio-node-server.onrender.com/sms'


/** class for signal sent to db  */
class SosSignal {
    id: string;
    uid: string | undefined;
    createdAt: Timestamp;
    geolocation: GeoCodes;
    signalType: string | undefined;

    constructor(id: string, uid: string, createdAt: Timestamp, geolocation: GeoCodes, signalType: string | undefined) {
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
    recipientPhone: string;
    geolocation: GeoCodes;
    signalId: string;
    signalType: string;

    constructor( 
        message:string |undefined,
        senderName: string | undefined | null, 
        recipientPhone: string,  
        geolocation: GeoCodes, signalId: string, signalType:string) {
            this.message = message;
            this.senderName = senderName;
            this.recipientPhone = recipientPhone;
            this.geolocation = geolocation;
            this.signalId = signalId;
            this.signalType = signalType;
        }
}

const Dashboard = () => {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const showMenuButtons = useSelector((state: any) => state.dashboard.showMenuButtons);
    const sentSignalId = useSelector((state:any)=> state.dashboard.sentSignalId);
    const [signalType, setSignalType] = useState<SignalsList>(); //signaltype in state will be send to twilio
    const [geolocation, setGeolocation] = useState<GeoCodes>({ lat: 0, lng: 0 });
    const [twilioReady, setTwilioReady] = useState<boolean>(false);
    const [messageSent, setMessageSent] = useState<boolean>(false);

    const timestamp_helper = serverTimestamp();

    const { data } = useFetchUserSignalsByIdQuery({ id: uid });
    
    const sosButtonRef = useRef<HTMLButtonElement>(null);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const sosSpanRef = useRef<HTMLSpanElement>(null)

    /** set default signal to be ready in state */
    useEffect(() => {
        if (user && data) {
            const default_signalType: SignalsList = (data.filter((item) => item.id === "DEFAULT"))[0];
            setSignalType(default_signalType);
        }
        if (messageSent === true) {setMessageSent(false)}
        //eslint-disable-next-line
    }, [user, data])

    const { coords, isGeolocationAvailable, isGeolocationEnabled, /* getPosition */ } =
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
        if (!user){
            alert('You must be signed in to use SOS');
            return 
        }
       /*  if (twilioReady === true) {
            setTwilioReady(false)} */
        sosButtonRef.current!.classList.toggle('flash');
        cancelButtonRef.current!.classList.toggle('active');
        getGeolocation();
        dispatch(setShowMenuButtons(true)); 
        sosTimer = setTimeout(()=>(sendSosDefault(signalType)), 15 * 1000);
    }

    /* 

     const sosSignal = new SosSignal(
        uuidv4(), 
        uid, 
        serverTimestamp() as Timestamp, 
        geolocation, 
        signalType?.name
    );
    postDataToDb(sosSignal);
    dispatch(setSentSignalId(sosSignal.id));

     */

    /* for sending signal to db */
    async function postDataToDb(signal: Signal) {

        try {
            console.log('current database payload:', signal );
            console.log('submitting signal with ID:', signal.id);
            await setDoc(doc(db, 'signals', signal.id), {
                id: signal.id,
                uid: user?.uid,
                createdAt: timestamp_helper,
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
        setSignalType(signal => ({ ...signal, ...selected_signal }));

        const sosSignal = new SosSignal(
            uuidv4(), 
            uid, 
            serverTimestamp() as Timestamp, 
            geolocation, 
            signalType?.name
            );
            
        postDataToDb(sosSignal);
        dispatch(setSentSignalId(sosSignal.id));

        setTwilioReady(true);
    }

    /** send default signal if timer expires */
    async function sendSosDefault(signal:SignalsList | undefined) {
       // sosButtonRef.current!.classList.toggle('flash')
        cancelButtonRef.current!.classList.toggle('active');
        console.log(geolocation);

        const sosSignal = new SosSignal(
            uuidv4(), 
            uid, 
            serverTimestamp() as Timestamp, 
            geolocation, 
            signalType?.name
            );

        postDataToDb(sosSignal);
        dispatch(setSentSignalId(sosSignal.id));
        
        console.log('sending default sos signal....')
        setTwilioReady(true);
    }

    /** POST TO TWILIO SERVER, SEND SMS */

    const twilioMessage = async ( sms_signal:SignalsList | undefined) => {
        sms_signal?.recipients.forEach((recipient)=> {

            let sendMe = new SmsSignal(
                sms_signal.presetMsg, 
                user?.displayName,  
                recipient, 
                geolocation, 
                sentSignalId, 
                sms_signal.name);

            try {
                console.log('Sending Twilio server payload:', sendMe);
                   axios.post(server_prod_url, {
                       message: sendMe.message,
                       senderName: sendMe.senderName,
                       recipient: sendMe.recipientPhone,
                       geolocation: geolocation, 
                       signalId: sendMe.signalId,
                       signalType: sendMe.signalType 
                   }).then((res) => { console.log(res); setMessageSent(true) })
                 
               } catch (err: any) {
                   alert(err.message);
               } 
            })
            setTwilioReady(false);
            dispatch(setShowMenuButtons(false)); 
            sosButtonRef.current!.classList.toggle('suspend');
            sosSpanRef.current!.classList.toggle('suspend');
            //change sosButton class to suspend
    }




    function cancelSos(e: any) {
        clearTimeout(sosTimer);
        dispatch(setShowMenuButtons(false));
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
            twilioMessage(signalType);
            console.log('sos signal type being sent to twilio:', signalType)
        }
        else {
            console.log('awaiting ready message')};
                   
//eslint-disable-next-line
    },[twilioReady]);


    return (
        <div className="dashboard">
            <div className="dashboardContainer">
                <div className="sosButtonContainer">
                    <button ref={sosButtonRef} type="button" className="sosButton" id="sosButton" onClick={activateSosButton}>
                        <span ref={sosSpanRef}>SOS</span>
                    </button>
                    <div>  <button ref={cancelButtonRef} className="cancelButton" onClick={cancelSos}>
                        <div className="div1"><span style={{ position: "relative", top: '15px' }}>CANCEL</span></div><div className="div2"></div>
                    </button></div>

                </div>
            </div>
{ messageSent ? (<div className="activation-text">
                    <span> SOS sent, awaiting response </span></div>):(<></>)}

            {     showMenuButtons ? (<div className="activation-text">
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
