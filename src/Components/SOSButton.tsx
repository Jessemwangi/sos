import React, { useRef } from 'react';
import '../styles/SOSButton.css';
import { useDispatch } from 'react-redux';
import { activate } from '../features/sosButtonSlice';
import Timer from './Timer';

const SOSButton = () => {
    //const active = useSelector((state: any) => state.sosButton.active);
    const dispatch = useDispatch();

    //const sosButton = useRef<HTMLButtonElement>(null);

    function activeSosButton(e: any) {
        e.currentTarget.classList.toggle('flash')
        dispatch(activate(true));
    }



    return (
        <button type="button" className="sosButton" id="sosButton" onClick={activeSosButton}>
            <span>SOS</span>

        </button>

    );
};

export default SOSButton;