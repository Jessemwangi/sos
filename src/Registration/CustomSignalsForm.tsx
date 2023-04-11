import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../app/services/FirebaseAuth';
import { SignalsList } from '../app/model';
import { db } from '../DataLayer/FirestoreInit';
import { setStoreSignalsList, signalsListApi, resetForm } from '../features/manageSignalSlice';

const CustomSignalsForm = () => {

    //for creating user's custom emergency types
    //used as a component in the custom signals page of the regWizard, for optional setup, and in manageSignals page
    const [buttonAction] = useState<string>('Save Signal')
    const dispatch = useDispatch();
    const storeSignal: SignalsList = useSelector((state: any) => state.storeSignalsList);
    const [user] = useAuthState(auth);
    const uid = user?.uid;

    function handleChange(e: any) {
        dispatch(setStoreSignalsList({ [e.target.name]: e.target.value }))
    }

    function completeSignal() {
        dispatch(setStoreSignalsList({ uid: uid, id: uuidv4() }));

    }

    async function handleSubmit() {
        completeSignal();
        try {
            await setDoc(doc(db, 'signalsList', storeSignal.id), {
                id: storeSignal.id,
                uid: user?.uid,
                name: storeSignal.name,
                recipients: storeSignal.recipients,
                presetMsg: "",
                cstTextId: storeSignal.cstTextId,
                createdAt: ""
            }, { merge: true })
                .then(() => { console.log('submitted to firestore') })
            dispatch(resetForm());
            dispatch(signalsListApi.util.invalidateTags(['UserSignals']))

        }
        catch (error: any) {
            return { error: error.message }
        }
    }

    return (
        <div>
            <>
                <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
                    Add Customized Signals
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Signal Name"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="message">Message</InputLabel>
                            <Select
                                labelId="message"
                                id="messageSelect"

                                label="Message"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            required
                            id="recipients"
                            name="recipients"
                            label="Choose recipients"
                            fullWidth
                            autoComplete="cc-recipients"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>

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

            </>
        </div>
    );
};

export default CustomSignalsForm;