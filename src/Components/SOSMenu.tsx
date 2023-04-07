import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/SOSMenu.css";
//import { selectSos } from "../features/sosMenuSlice";
import { SignalsList } from '../app/model';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../app/services/FirebaseAuth'
import { useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';



const emergencyList: SignalsList[] = [
    {
        signalId: '4',
        uid: '',
        name: 'Fire',
        recipients: [],
        presetMsg: 'string',
        cstTextId: '',
        createdAt: new Date(),
        pinned: true
    },
    {
        signalId: '45',
        uid: '',
        name: 'Medical Emergency',
        recipients: [],
        presetMsg: 'string',
        cstTextId: '',
        createdAt: new Date(),
        pinned: true
    },

    {
        signalId: '657',
        uid: '',
        name: 'Home Invasion',
        recipients: [],
        presetMsg: 'string',
        cstTextId: '',
        createdAt: new Date(),
        pinned: true
    },
    {
        signalId: '789',
        uid: '4',
        name: 'Custom Field',
        recipients: [],
        presetMsg: 'string',
        cstTextId: '567sd',
        createdAt: new Date(),
        pinned: true
    }
]


//TODO: fetch emergency list from db


const SOSMenu = () => {

    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const dispatch = useDispatch();

    const {
        data,
        isFetching,
        error
    } = useFetchSignalsListByIdQuery({ id: uid });

    function clickHandler(e: any) {
        //dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
    }


    console.log(data);
    return (
        <div className="sosMenu">
            {emergencyList.map((item) => (
                <button key={item.signalId} onClick={clickHandler}>{item.name}</button>))}
        </div>
    );
};

export default SOSMenu;