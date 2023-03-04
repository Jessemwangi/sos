import React from 'react';
import SOSButton from '../Components/SOSButton';
import SOSMenu from '../Components/SOSMenu';
import '../styles/Dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <div className="sosButtonContainer"><SOSButton /></div>
            <div className="sosMenuContainer"><SOSMenu /></div>

        </div>
    );
};

export default Dashboard;