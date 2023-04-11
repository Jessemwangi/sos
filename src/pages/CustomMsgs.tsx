import React from 'react';
import CustomTextView from '../Components/CustomTextView';
import CustomTextEntryForm from '../Registration/CustomTextForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';

const CustomMsgs = () => {
    //For managing custom messages

    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const {
        data,
        isFetching,
        error
    } = useFetchMessagesByIdQuery({ id: uid });

  
    return (
        <div style={{ padding: '2rem' }}>
            <CustomTextView data={data} isFetching={isFetching} error={error} />
            <CustomTextEntryForm />
        </div>
    );

};
export default CustomMsgs