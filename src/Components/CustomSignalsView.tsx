import React, { useState } from 'react';
import { Typography, Grid, TextField, Button } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../DataLayer/FirestoreInit';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';

import { setSignal } from '../features/signalSlice';


/*
export interface SignalsList {
    signalId: string,
    uid: string,
    name: string,
    recipientId: string[],
    presetMsg: string,
    cstTextId?: string,
    createdAt?: Date
}

interface GeoCodes {
    lat: number,
    lon: number
}*/

const CustomSignalsView = () => {

    //for creating user's custom emergency types
    //a component in the custom signals page of the regWizard, for optional setup

    const [buttonAction] = useState<string>('Save Signal')
    const dispatch = useDispatch();
    const storeSignal = useSelector((state) => { })
    const [user] = useAuthState(auth);

    function handleChange(e: any) {
        dispatch(setSignal({ [e.target.name]: e.target.value }))
    }

    async function handleSubmit() {
        console.log('clicked')


        try {
            await setDoc(doc(db, 'customTexts', storeSignal.signalId), {
                signalId: storeSignal.signalId,
                name: storeSignal.name,
                uid: user.uid,
                userId: storeSignal.userId
            }, { merge: true })
                .then(() => { console.log('submitted to firestore') })
            dispatch(clearText());
            dispatch(triggerReload());
        }
        catch (error: any) {
            return { error: error.message }
        }
    }

    return (
        <div>

            <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
                Add Customized Signals
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="cc-title"
                        variant="standard"
                        defaultValue={storeText.title}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="message"
                        name="message"
                        label="Message"
                        fullWidth
                        autoComplete="cc-Message"
                        variant="standard"
                        defaultValue={storeText.message}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {buttonAction}
                    </Button>
                </Grid>

            </Grid>


        </div>
    );
};

export default CustomSignalsView;