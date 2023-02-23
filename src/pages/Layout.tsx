import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { GetData } from '../app/functions/DbFunctions';

const Layout = () => {
 const { response, error, Loading } = GetData('users')  
        console.log('Loading',Loading, 'error....',error, 'response.....',response)


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