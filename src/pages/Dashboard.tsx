import React, { useEffect } from 'react';
import SOSButton from '../Components/SOSButton';
import SOSMenu from '../Components/SOSMenu';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

const Dashboard = () => {
    const dispatch = useDispatch();
    const active = useSelector((state: any) => state.sosButton.active);

    useEffect(() => {
        if (active) {
            const timer = () => setTimeout(() => { }, 120 * 1000);
        }
    }, [active])

    return (
        <div className="dashboard">
             <div className="sosButtonContainer"><SOSButton /></div>
            <div></div>
            {active ? (<div><Typography variant="h5">SOS has been activated. Select emergency type : </Typography>
                <div className="sosMenuContainer"><SOSMenu /></div></div>)
                : (<></>

                )}

        </div>
    );
};

export default Dashboard;