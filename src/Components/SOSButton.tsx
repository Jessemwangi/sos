import React, { useRef } from 'react';
import '../styles/SOSButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { activate } from '../features/sosButtonSlice';
import Timer from './Timer';

const SOSButton = () => {
    const active = useSelector((state: any) => state.sosButton.active);
    const dispatch = useDispatch();
    console.log(active)


    //const sosButton = useRef<HTMLButtonElement>(null);

    function activateSosButton(e: any) {
        e.currentTarget.classList.toggle('flash')
        dispatch(activate(true));
        console.log(active)
    }



    return (
        <button type="button" className="sosButton" id="sosButton" onClick={activateSosButton}>
            {!active ? <span>SOS</span> : (<><Timer /></>)}

        </button>

    );
};

export default SOSButton;