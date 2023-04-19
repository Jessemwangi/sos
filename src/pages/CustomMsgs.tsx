import React from 'react';
import CustomTextView from '../components/CustomTextView';
import CustomTextEntryForm from '../registration/CustomTextForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';
import { Typography } from '@mui/material';

const CustomMsgs = () => {
    //For managing custom messages

    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const {
        data,
        isFetching,
        error
    } = useFetchMessagesByIdQuery({ id: uid });

    if (!user) {
        return (<Typography component="h2" variant="h6" color="primary" gutterBottom>Please sign in to manage your custom messages</Typography>)
    }

    return (
        <div style={{ padding: '2rem' }}>
            <CustomTextView data={data} isFetching={isFetching} error={error} />
            <CustomTextEntryForm />
        </div>
    );

};
export default CustomMsgs