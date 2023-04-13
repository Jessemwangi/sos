import React from 'react';
import '../styles/SOSButton.css';
import { useDispatch, useSelector } from 'react-redux';

//import Timer from './Timer';
//MouseEvent<HTMLButtonElement>

interface Props {
    clickHandler: any
}

const SOSButton = ({ clickHandler }: Props) => {
    const activeSos = useSelector((state: any) => state.dashboard.activeSos);
    const dispatch = useDispatch();

    //const sosButton = useRef<HTMLButtonElement>(null);

    return (
        <button type="button" className="sosButton" id="sosButton" onClick={clickHandler}>
            {/*     {activeSos ? (<Timer clickHandler={cancelClickHandler} />) :  */}
            <span>SOS</span>

        </button>

    );
};

export default SOSButton;