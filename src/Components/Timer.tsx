import React from 'react';
import '../styles/Timer.css'

const Timer = ({ clickHandler }: any) => {


    return (
        <svg onClick={clickHandler} width="160" height="160">
            <circle cx="80" cy="80" r="80"> </circle>
        </svg>



    );
};

export default Timer;




{/* <div className="timer" onClick={clickHandler}>
            <div className="ticker">
            </div>
        </div> */}