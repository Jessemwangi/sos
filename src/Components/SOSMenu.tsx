import React from 'react';
import "../styles/SOSMenu.css";

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
    function clickHandler() { }

    return (
        <div className="sosMenu">
            {emergencyList.map((item) => (
                <button onClick={clickHandler}>{item.text}</button>))}



        </div>
    );
};

export default SOSMenu;