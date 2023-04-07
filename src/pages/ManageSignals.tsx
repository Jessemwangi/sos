import React from 'react';
import CustomSignalsView from '../Components/CustomSignalsView';
import SetPinnedSignals from '../Components/SetPinnedSignals';

const ManageSignals = () => {

    //Is this for viewing and managing a user's signal templates?

    return (
        <div>
            <CustomSignalsView />
            <SetPinnedSignals />

        </div>
    );
};

export default ManageSignals;