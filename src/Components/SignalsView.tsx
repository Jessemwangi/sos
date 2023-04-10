import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../app/services/FirebaseAuth';
import { SignalsList } from '../app/model';
import { db } from '../DataLayer/FirestoreInit';

import { setStoreSignalsList, resetForm, useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';

const SignalsView = () => {
    const dispatch = useDispatch();
    const storeSignal: SignalsList = useSelector((state: any) => state.storeSignalsList);
    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const { data, isFetching } = useFetchSignalsListByIdQuery({ id: uid });
    return (
        <div>

        </div>
    );
};

export default SignalsView;