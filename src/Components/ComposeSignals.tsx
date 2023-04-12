import React, { useState, useEffect } from 'react';
import { CustomText, Recipient, SignalsList } from '../app/model';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Typography, Grid, TextField, Button, FormControl, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, FormGroup } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { auth } from '../app/services/FirebaseAuth';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../DataLayer/FirestoreInit';
import { setSignalsList, resetForm, signalsListApi } from '../features/manageSignalSlice';

interface Props {
    messages: CustomText[],
    recipients: Recipient[]
    signals: SignalsList[]
}

const ComposeSignals = ({ messages, recipients, signals }: Props) => {
    const [readyState, setReadyState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const signalsList: SignalsList = useSelector((state: any) => state.signalsList);
    const [user] = useAuthState(auth);
    /*     const uid = user?.uid; */

    const [buttonAction] = useState<string>('Save Signal')
    /* 
        console.log(recipients);
        console.log(messages)
        console.log(signals) */

    // const [objectState, setObjectState] = useState(init);

    function handleName(e: any) {
        console.log(e.target.value)
        dispatch(setSignalsList({ [e.target.name]: e.target.value }))
        if (readyState === true) { setReadyState(false) }

    }

    function handleRecipients(e: any) {
        console.log(e.target.value)
        dispatch(setSignalsList({ [e.target.name]: e.target.value }))
        if (readyState === true) { setReadyState(false) }

    }

    function handleMessage(e: any) {
        console.log(e.target.value)
        console.log(e.currentTarget.id);
        dispatch(setSignalsList({ [e.target.name]: e.target.value }))
        if (readyState === true) { setReadyState(false) }

    }

    function completeSignal() {
        /*    if (!titleInput.current!.value || !messageInput.current!.value || !recipientsInput.current!.value) {
               alert("Some fields are missing data");
               return null;
           } else {
               dispatch(setSignalsList({ uid: uid, id: uuidv4() }));
               setReadyState(true);
           } */

    }

    async function handleSubmit() {
        completeSignal();
        try {
            await setDoc(doc(db, 'signalsList', signalsList.id), {
                id: signalsList.id,
                uid: user?.uid,
                name: signalsList.name,
                recipients: signalsList.recipients,
                presetMsg: "",
                cstTextId: signalsList.cstTextId,
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

    const filteredMessage = (textId: string) => { messages.filter((item) => item.id === textId) }




    return (
        <div>

            <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
                Add Customized Signal Name
            </Typography>

            <Grid item xs={12} md={6} marginBottom={'1rem'}>
                <TextField
                    required
                    id="nameInput"
                    name="name"
                    label="Choose a name for the signal"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    onChange={handleName}
                />
            </Grid>


            <Grid item marginBottom={'1rem'}>
                <FormControl fullWidth >
                    <InputLabel id="message">Message</InputLabel>

                    <Select
                        labelId="message"
                        id="messageSelect"
                        label="Choose which message should be sent for this signal"
                        onChange={handleMessage}
                        defaultValue=""
                    >
                        {messages?.map((item: any) => (
                            <MenuItem key={item.id} value={item.message}>{item.message}</MenuItem>

                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Select the signal recipients</Typography>
                <FormGroup>
                    {recipients?.map((item: any) => (
                        <FormControlLabel key={item.id} control={
                            <Checkbox key={item.id} id={item.id} name={item.id} value={item.id} onChange={handleRecipients} />
                        } label={item.name} />
                    ))
                    }
                </FormGroup>
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
        </div>
    );
};

export default ComposeSignals;