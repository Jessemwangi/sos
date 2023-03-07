import React from 'react';
import "../styles/SOSMenu.css";

//TODO: fetch emergency list from db
const emergencyList: string[] = ["Fire", "Home Invasion", "Domestic Violence", "Medical Emergency", "Custom Field"]

const SOSMenu = () => {


    return (
        <div className="sosMenu">
            {emergencyList.map((item: string) => (
                <div className="sosMenuButton">{item}</div>))}



        </div>
    );
};

export default SOSMenu;