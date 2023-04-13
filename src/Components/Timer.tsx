import React from 'react';
import '../styles/Timer.css'

const Timer = ({ clickHandler }: any) => {


    return (
        <div className="timer-container" onClick={clickHandler}>
            <div className="timer">
                <span>SOS</span>
                <div className="ticker">
                </div>
            </div>
        </div>
    );
};

export default Timer;