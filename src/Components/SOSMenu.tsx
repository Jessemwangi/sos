import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/SOSMenu.css";
//import { selectSos } from "../features/sosMenuSlice";
import { SignalsList } from '../app/model';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../app/services/FirebaseAuth'
import { useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';


const SOSMenu = () => {

    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const dispatch = useDispatch();

    const {
        data
    } = useFetchSignalsListByIdQuery({ id: uid });
    console.log('signals data', data);

    function clickHandler(e: any) {
        //dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');
    }

    return (
        <div className="sosMenu">
            {data?.map((item) => (
                <button key={item.id} onClick={clickHandler}>{item.name}</button>))}
        </div>
    );
};

export default SOSMenu;