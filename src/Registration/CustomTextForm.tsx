import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../DataLayer/FirestoreInit';
import { CustomText } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { setText, clearText, triggerReload } from '../features/customTextSlice';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';



export default function CustomTextForm() {

  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const dispatch = useDispatch();
  const [buttonAction] = useState<string>('Save Text')
  const [ready, setReady] = useState<boolean>(false);

  const storeText: CustomText = useSelector((state: any) => state.customText.customText);

  const { data } = useFetchMessagesByIdQuery({ id: uid })
  //const generic_message: CustomText = data 

  const defaultMsg = data?.filter((msg) => { return msg.default === true });

  const init: CustomText = {
    cstTextId: "",//uuid generated id
    message: "",
    title: "",
    userId: uid,
    default: false
  }


  function handleChange(e: any) {
    dispatch(setText({ [e.target.name]: e.target.value }))
    if (ready === true) { setReady(false) }

  }

  function handleChecked(e: any) {
    dispatch(setText({ [e.target.name]: e.target.checked }))
    console.log(e.currentTarget.name, e.target.checked);
  }

  function completeText() {
    dispatch(setText({ userId: uid, cstTextId: uuidv4() }));
    setReady(true);

  }

  async function handleSubmit() {
    console.log('clicked')
    completeText();

  }


/*

db.collection("cities").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        doc.ref.update({
            capital: true
        });
    });
});

*/



  async function sendData() {
    await setDoc(doc(db, 'customTexts', storeText.cstTextId), {
      cstTextId: storeText.cstTextId,
      message: storeText.message,
      title: storeText.title,
      userId: storeText.userId,
      default: storeText.default
    }, { merge: true })
      .then(() => { console.log('submitted to firestore') })
      .catch((err) => alert(err));
    dispatch(clearText());
    dispatch(triggerReload());
    console.log(storeText);
  }


  useEffect(() => {

    sendData();


  }, [ready])



  /* 
    useEffect(() => {
  
      console.log('check text in store:', storeText);
  
    }, [storeText]) */

  return (
    <React.Fragment>

      <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>


        Add Customized Text
      </Typography>
      <p>   Your current default text message is:
        <span>{ }</span>
        This is the message that will be sent if no specific signal type is chosen.
        You can add personalised messages below.</p>
      <p>If you wish to set a message as your default message, toggle the checkbox.</p>
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
        <Grid item>
          <FormControlLabel control={<Checkbox id="default" name="default" onChange={handleChecked} />} label="Set as default message" />

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
    </React.Fragment>
  );
}