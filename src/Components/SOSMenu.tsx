import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/SOSMenu.css";
import { selectSos } from "../features/sosMenuSlice";
import { signalsList } from '../app/model';



const emergencyList: signalsList[] = [
    {
        signalId: 0,
        uid: '',
        name: 'Fire',
        recipientId: ['0', '1'],
        presetMsg: 'string',
        cstTextId: 0,
        createdAt: new Date()
    },
    {
        signalId: 1,
        uid: '',
        name: 'Medical Emergency',
        recipientId: ['0', '1', '3'],
        presetMsg: 'string',
        cstTextId: 0,
        createdAt: new Date()
    },

    {
        signalId: 2,
        uid: '',
        name: 'Home Invasion',
        recipientId: ['0', '1', '3'],
        presetMsg: 'string',
        cstTextId: 0,
        createdAt: new Date()
    },
    {
        signalId: 3,
        uid: '',
        name: 'Domesetic Violence',
        recipientId: ['0', '1', '3'],
        presetMsg: 'string',
        cstTextId: 0,
        createdAt: new Date()
    }, {
        signalId: 4,
        uid: '4',
        name: 'Custom Field',
        recipientId: ['0', '1', '3'],
        presetMsg: 'string',
        cstTextId: 0,
        createdAt: new Date()
    }
]


//TODO: fetch emergency list from db


const SOSMenu = () => {
    const dispatch = useDispatch();

    function clickHandler(e: any) {
        dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
    }



    return (
        <div className="sosMenu">
            {emergencyList.map((item) => (
                <button key={item.signalId} onClick={clickHandler}>{item.name}</button>))}



        </div>
    );
};

export default SOSMenu;