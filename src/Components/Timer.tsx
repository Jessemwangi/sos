import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

    function cancelSos() {
        //clearTimeout(timer)
    }
    return (
        <div>

        </div>
    );
};

export default Timer;