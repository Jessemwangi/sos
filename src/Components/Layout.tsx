import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import '../styles/Layout.css';


const Layout = () => {

    return (
        <div className="layout">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default Layout;