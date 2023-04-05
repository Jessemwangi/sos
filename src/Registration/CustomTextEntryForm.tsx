import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { doc, updateDoc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import { db } from '../DataLayer/FirestoreInit';
//import CustomTextView from '../Components/CustomTextView';
import { CustomText } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetMessageMutation, setText, clearText } from '../features/customTextSlice';


export default function CustomTextEntryForm() {

  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const dispatch = useDispatch();
  const [buttonAction] = useState<string>('Save Text')

  const storeText: CustomText = useSelector((state: any) => state.customText.customText);


  const init: CustomText = {
    cstTextId: "",//uuid generated id
    message: "",
    title: "",
    userId: uid
  }


  function handleChange(e: any) {
    dispatch(setText({ [e.target.name]: e.target.value }))
  }

  function completeText() {
    dispatch(setText({ userId: uid, cstTextId: uuidv4() }));

  }



  async function handleSubmit() {
    console.log('clicked')
    completeText();

    try {
      await setDoc(doc(db, 'customTexts', storeText.cstTextId), {
        cstTextId: storeText.cstTextId,
        message: storeText.message,
        title: storeText.title,
        userId: storeText.userId
      }, { merge: true })
        .then(() => { console.log('submitted to firestore') })
      dispatch(clearText());
    }
    catch (error: any) {
      return { error: error.message }
    }
  }

  /* 
    useEffect(() => {
   
      console.log('check text in store:', storeText);
   
    }, [storeText]) */

  return (
    <React.Fragment>

      <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
        Add more Customized Text
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
    </React.Fragment>
  );
}