import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Timer.css'

const Timer = () => {


    return (
        <div className="timer-container">
            <div className="timer">
                <div className="ticker"></div>

            </div>

        </div>
    );
};

export default Timer;