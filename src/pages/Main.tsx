import { Outlet } from 'react-router-dom';
import "../styles/Main.css";

import React from 'react';

const Main = () => {
    return (
        <div className="main">
            <Outlet />
        </div>
    );
};

export default Main;