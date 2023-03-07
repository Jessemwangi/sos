import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/SOSMenu.css";
import { selectSos } from "../features/sosMenuSlice";

interface Emergency {
    text: string,
    emergencyId: number
}

//TODO: fetch emergency list from db
const emergencyList: Emergency[] = [{
    text: "Fire",
    emergencyId: 0
},
{
    text: "Home Invasion",
    emergencyId: 1
},
{
    text: "Domestic Violence",
    emergencyId: 2
},
{
    text: "Medical Emergency",
    emergencyId: 3
},
{
    text: "Custom Field",
    emergencyId: 4
},
]

const SOSMenu = () => {
    const dispatch = useDispatch();
    function clickHandler(e: any) {
        dispatch(selectSos(e.target.key));
        e.target.classList.toggle('selected');

    }

    return (
        <div className="sosMenu">
            {emergencyList.map((item) => (
                <button key={item.emergencyId} onClick={clickHandler}>{item.text}</button>))}



        </div>
    );
};

export default SOSMenu;