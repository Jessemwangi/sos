import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SignalsList } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { db } from '../dataLayer/FirestoreInit';
import { setSignalsList, signalsListApi, resetForm } from '../features/manageSignalSlice';

const CustomSignalsForm = () => {

    //for creating user's custom emergency types
    //used as a component in the custom signals page of the regWizard, for optional setup, and in manageSignals page
    const [buttonAction] = useState<string>('Save Signal')
    const dispatch = useDispatch();
    const storeSignal: SignalsList = useSelector((state: any) => state.storeSignalsList);
    const [user] = useAuthState(auth);
    const uid = user?.uid;

    function handleChange(e: any) {
        dispatch(setSignalsList({ [e.target.name]: e.target.value }))
    }

    function handleChecked(e: any) { }

    function completeSignal() {
        dispatch(setSignalsList({ uid: uid, id: uuidv4() }));

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
                    Add Customized Signal Name
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Choose a name for the signal"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    {/*   <Grid item xs={12} md={6}>
                        <FormControlLabel control={<Checkbox id="" name="" onChange={handleChecked} />} label="Set as default signal" />
                    </Grid> */}
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