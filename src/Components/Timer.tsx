import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Timer.css'

const Timer = () => {


    //state:
    const signal = useSelector((state: any) => state.signal);

    function startTimer() {
        const timer = setTimeout(() => {
            // //signal received
            /*   if () {
                 
  
              } */
        }, 120 * 1000);

    }


    return (
        <div className="timer-container">
            <div className="timer">
                <div className="ticker"></div>

            </div>

        </div>
    );
};

export default Timer;