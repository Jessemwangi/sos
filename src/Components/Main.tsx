import React from 'react';
import { Outlet } from 'react-router-dom';

import "../styles/Main.css";

const Main = () => {
   
    return (
        <div className="main">
            <Outlet />
           
        </div>
    );
};

export default Main;