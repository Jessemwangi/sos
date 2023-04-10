import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';



//recipients are sent a link to this page. Its path is unique and generated from the signal id. 
//signal with unique id is created in firestore when SOS is activated.
//when loaded, this page retrieves the signal data from firestore by id. 

const AnsToSignals = () => {
    const params = useParams();
    const signalid = params.signalid;

    //fetch
    return (
        <div style={{ padding: '2rem' }}>
            <p>Signal id: {signalid}</p>
            <h1>SOS Service Responders Page</h1>




        </div>
    );
};

export default AnsToSignals;