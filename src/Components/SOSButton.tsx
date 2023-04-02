import React from 'react';
import '../styles/SOSButton.css';
import { useDispatch } from 'react-redux';
import { activate } from '../features/sosButtonSlice';

const SOSButton = () => {
    //const active = useSelector((state: any) => state.sosButton.active);
    const dispatch = useDispatch();

    function activeSosButton() {
        const sosButton = document.getElementById('sosButton');
        sosButton!.classList.toggle('flash');
        dispatch(activate());
    }



    return (
        <button className="sosButton" id="sosButton" onClick={activeSosButton}>
            <span>SOS</span>
        </button>

    );
};

export default SOSButton;