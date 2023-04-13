import React from 'react';
import SignalsView from '../components/SignalsView';
import SetPinnedSignals from '../components/SetPinnedSignals';
//import CustomSignalsForm from '../Registration/CustomSignalsForm';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../app/services/FirebaseAuth';
import { SignalsList, CustomText, Recipient } from '../app/model';

import { useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';
import { useFetchRecipientsByIdQuery } from "../features/manageRecipientsSlice";
import ComposeSignals from '../components/ComposeSignals';
import { Typography } from '@mui/material';

const ManageSignals = () => {


    const [user] = useAuthState(auth);
    const uid = user?.uid;
    const messages_Data = useFetchMessagesByIdQuery({ id: uid });
    const signals_Data = useFetchSignalsListByIdQuery({ id: uid });
    const recipients_Data = useFetchRecipientsByIdQuery({ id: uid });
    const messages = messages_Data.data as CustomText[];
    const recipients = recipients_Data.data as Recipient[];
    const signals = signals_Data.data as SignalsList[];

    if (!user) {
        return (<Typography component="h2" variant="h6" color="primary" gutterBottom>Please sign in to manage your signals</Typography>)
    }

    return (
        <div style={{ padding: '2rem' }}>
            <SignalsView messages={messages} signals={signals} />
            {/*     <CustomSignalsForm /> */}
            <SetPinnedSignals />
            <ComposeSignals messages={messages} recipients={recipients} signals={signals} />

        </div>
    );
};

export default ManageSignals;