import React, { useEffect } from 'react';
import SOSButton from '../Components/SOSButton';
import SOSMenu from '../Components/SOSMenu';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

const Dashboard = () => {
    const dispatch = useDispatch();
    const active = useSelector((state: any) => state.sosButton.active);
    const timer = setTimeout(() => { }, 120 * 1000);
    /*  funtion cancelSos(){
         clearTimeout(timer);
     } */

    /* const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;  
const client = require('twilio')(accountSid, authToken);
client.messages
      .create({from: '+15017122661', body: 'Hi there', to: '+15558675310'})
      .then(message => console.log(message.sid)); */

    //`https://api.twilio.com/2010-04-01/Accounts/${AccountSid}/Messages.json`

    useEffect(() => {
        if (active) {


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