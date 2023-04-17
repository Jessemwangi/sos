import React, { useState, useEffect, useRef } from 'react';
import { CustomText, Recipient, SignalsList } from '../app/model';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Typography, Grid, TextField, Button, FormControl, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, FormGroup, } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { toast } from 'react-toastify';
import { auth } from '../app/services/FirebaseAuth';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../dataLayer/FirestoreInit';
import { setSignalsList, resetForm } from '../features/manageSignalSlice';
import { signalsListApi } from '../features/signalsListApi'
import CustomTextForm from '../registration/CustomTextForm';

type UserSignals = SignalsList[]

interface Props {
    messages: CustomText[]
    recipients: Recipient[]
    signals: UserSignals
}


const ComposeSignals = ({ messages, recipients, signals }: Props) => {
    const [readyState, setReadyState] = useState<boolean>(false);
    const dispatch = useDispatch();
    const signalsList: SignalsList = useSelector((state: any) => state.manageSignals.signalsList);
    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const [buttonAction] = useState<string>('Save Signal')
    const [recipientList, setRecipientList] = useState<string[]>([])

    const nameInput = useRef<HTMLInputElement>();
    const messageSelect = useRef<HTMLInputElement>();


    function handleName(e: any) {
        if (readyState === true) { setReadyState(false) }
        dispatch(setSignalsList({ name: e.target.value }))
    }

    function handleMessage(e: any) {
        if (readyState === true) { setReadyState(false) }
        dispatch(setSignalsList({ presetMsg: e.target.value }))
    }

    //would it be better for recipients to be an object array, each object with recipient name and id, phone?
    function handleRecipients(e: React.ChangeEvent<HTMLInputElement>, id: string) {
        if (readyState === true) { setReadyState(false) }
        console.log(e.target.value, id)
        if (e.target.checked) { setRecipientList([...recipientList, e.target.value]) } else {
            setRecipientList((recipientList) => recipientList.filter((item) => (
                item !== e.target.value
            )))
        }
        dispatch(setSignalsList({ [e.target.name]: e.target.checked }))
    }

    //TOFIX: cstTextId values 
    function completeSignal() {
        if (!nameInput.current!.value || !messageSelect.current!.value || !recipientList.length) {
            alert("Some fields are missing data");
            return null;
        } else {
            dispatch(setSignalsList({ uid: uid, id: uuidv4(), recipients: recipientList, cstTextId: 'dummy' }));
            setReadyState(true);
        }
    }

    async function handleSubmit() {
        console.log(signalsList);
        completeSignal();
    }

    async function postData() {
        if (readyState) {
            try {
                console.log('sending as:', signalsList);
                await setDoc(doc(db, 'signalsList', signalsList.id), {
                    id: signalsList.id,
                    uid: uid,
                    name: signalsList.name,
                    recipients: signalsList.recipients,
                    presetMsg: signalsList.presetMsg,
                    cstTextId: signalsList.cstTextId,
                    createdAt: "",
                    default: false,
                    pinned: false
                }, { merge: true })
                    .then(() => { toast.success('Successfully submitted to firestore') })
                dispatch(resetForm());
                dispatch(signalsListApi.util.invalidateTags(['UserSignals']))
            }
            catch (error: any) {
                let errorMessage = error.message;
                errorMessage = errorMessage.substring(errorMessage.indexOf(' '));
                toast.error(errorMessage)
                setReadyState(false)
            }
        }
    }

    useEffect(() => {
        postData();
        dispatch(signalsListApi.util.invalidateTags(['UserSignals']))
        dispatch(resetForm());
        //eslint-disable-next-line
    }, [readyState])

    return (
        <div>
            <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
                Add Customized Signal Name
            </Typography>
            <Grid item xs={12} md={6} marginBottom={'1rem'}>
                <TextField
                    required
                    id="nameInput"
                    inputRef={nameInput}
                    name="name"
                    label="Choose a name for the signal"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    onChange={handleName}
                />
            </Grid>
            <CustomTextForm />
            <Grid item marginBottom={'1rem'}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Or select from your pre-defined Messages</Typography>
                <FormControl fullWidth >
                    <InputLabel id="message">Message</InputLabel>
                    <Select
                        /* labelId="message" */
                        id="messageSelect"
                        inputRef={messageSelect}
                        name="presetMsg"
                        label="Choose which message should be sent for this signal"
                        onChange={(e: any) => { handleMessage(e) }}
                        defaultValue="">

                        {messages?.map((item: CustomText) => (
                            <MenuItem
                                key={item.id}
                                id={item.id}
                                value={item.message}>{item.message}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Select the signal recipients</Typography>
                <FormGroup>
                    {recipients?.map((item: Recipient) => (
                        <FormControlLabel key={item.id} control={
                            <Checkbox
                                key={item.id}
                                id={item.id}
                                name='recipient'
                                value={item.phone}
                                onChange={(e: any) => handleRecipients(e, item.id)} />
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