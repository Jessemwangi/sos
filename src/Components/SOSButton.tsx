import React from 'react';
import '../styles/SOSButton.css';
import { useDispatch, useSelector } from 'react-redux';
import { activate } from '../features/sosButtonSlice';
import Timer from './Timer';

const SOSButton = () => {
    const active = useSelector((state: any) => state.sosButton.active);
    const dispatch = useDispatch();

    //const sosButton = useRef<HTMLButtonElement>(null);

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



    return (
        <button type="button" className="sosButton" id="sosButton" onClick={activateSosButton}>
            {active ? (<Timer clickHandler={cancelSos} />) : (<span>SOS</span>)}
        </button>

    );
};

export default SOSButton;