import React from 'react';
import CustomSignalsView from '../Registration/CustomSignalsForm';
import SetPinnedSignals from '../Components/SetPinnedSignals';

const ManageSignals = () => {

    //Is this for viewing and managing a user's signal templates?

    return (
        <div style={{ padding: '2rem' }}>
            <CustomSignalsView />
            <SetPinnedSignals />

        </div>
    );
};

export default ManageSignals;