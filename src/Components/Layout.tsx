import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import '../styles/Layout.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {

    return (
        <div className="layout">
            <Header />
            <ToastContainer />
            <Main />

            <Footer />
        </div>
    );
};

export default Layout;