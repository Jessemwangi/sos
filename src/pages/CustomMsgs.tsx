import React from 'react';
import CustomTextView from '../Components/CustomTextView';
import CustomTextEntryForm from '../Registration/CustomTextForm';

const CustomMsgs = () => {
    //For managing custom messages


    return (
        <div style={{ padding: '2rem' }}>
            <CustomTextView />
            <CustomTextEntryForm />
        </div>
    );
};

export default CustomMsgs;