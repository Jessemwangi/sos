import React, { useEffect } from 'react';
import SOSButton from '../Components/SOSButton';
import SOSMenu from '../Components/SOSMenu';
import '../styles/Dashboard.css'
import { useSelector, useDispatch } from 'react-redux';


const Dashboard = () => {
    const dispatch = useDispatch();
    const active = useSelector((state: any) => state.sosButton.active);
    console.log(active)
  

    useEffect(() => {
        if (active === true) { console.log('detecting active button') }
    }, [active])



    /*   Checks on timer state, when ready fires post request to twilio server endpoint: */

    /*     fetch('/sms/messages', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify()
           }) */


    //`https://api.twilio.com/2010-04-01/Accounts/${AccountSid}/Messages.json`



    return (
        <div className="dashboard">
            <div className="sosButtonContainer">
                <SOSButton />
            </div>

            {active ? (<div className="activation-text">
                <span >SOS has been activated. Select emergency type : </span>
                <div className="sosMenuContainer">
                    <SOSMenu />
                </div>
            </div>)
                : (<></>

                )}

        </div>
    );
};

export default Dashboard;