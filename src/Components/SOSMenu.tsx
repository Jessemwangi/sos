import React from 'react';
import "../styles/SOSMenu.css";
import { useDispatch } from 'react-redux';
import { SignalsList } from '../app/model';


interface Props {
    signals: SignalsList[],
    clickHandler: any
}
const SOSMenu = ({ signals, clickHandler }: Props) => {
    const dispatch = useDispatch();


    return (
        <div className="sosMenu">
            {signals?.map((item) => (
                <button key={item.id} onClick={clickHandler}>{item.name}</button>))}
        </div>
    );
};

export default SOSMenu;