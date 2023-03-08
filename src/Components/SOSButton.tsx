import React from 'react';
import '../styles/SOSButton.css';
import { useSelector, useDispatch } from 'react-redux';
import { activate } from '../features/sosButtonSlice';

const SOSButton = () => {
    const active = useSelector((state: any) => state.sosButton.active);
    const dispatch = useDispatch();

    console.log(active);

    function activeSosButton() {
        const sosButton = document.getElementById('sosButton');
        sosButton!.classList.toggle('flash');
        dispatch(activate());

    }

    return (
        <button className="sosButton" id="sosButton" onClick={activeSosButton}>
            <span>SOS</span>
            <p>status: {active}</p>
        </button>
    );
};

export default SOSButton;