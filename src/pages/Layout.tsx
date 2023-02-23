import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div>
            <Header/>
            <h1>LAYOUT</h1>
            <Outlet />

            <Footer/>
        </div>
    );
};

export default Layout;