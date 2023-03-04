import React from 'react';
import '../styles/SOSButton.css';

const SOSButton = () => {

    const sosButton = document.getElementById('sosButton');

    return (
        <button className="sosButton" id="sosButton" onClick={() => sosButton!.classList.toggle('flash')}>
            <span>SOS</span>
        </button>
    );
};

export default SOSButton;