import React from 'react';
import '../styles/SOSButton.css';

const SOSButton = () => {

    const sosButton = document.getElementById('sosButton');

    function activeSosButton(){
        sosButton!.classList.toggle('flash');
        
    }

    return (
        <button className="sosButton" id="sosButton" onClick={activeSosButton}>
            <span>SOS</span>
        </button>
    );
};

export default SOSButton;