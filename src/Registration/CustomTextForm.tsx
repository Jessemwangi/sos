import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, TextField, Button, /* Checkbox, FormControlLabel */ } from '@mui/material';
import { doc, setDoc, /* collection, getDocs, query, where, updateDoc */ } from "@firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { db } from '../DataLayer/FirestoreInit';
import { CustomText } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { setCustomText, resetForm } from '../features/customTextSlice';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';

export default function CustomTextForm() {

  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const dispatch = useDispatch();
  const [buttonAction] = useState<string>('Save Text')
  const [readyState, setReadyState] = useState<boolean>(false);

  const customText: CustomText = useSelector((state: any) => state.customText.customText)
  // const [objectState, setObjectState] = useState(init);

  const { data } = useFetchMessagesByIdQuery({ id: uid })

  const defaultText = data?.filter((item) => item.cstTextId === 'DEFAULT_MESSAGE')[0];

  function handleChange(e: any) {
    dispatch(setCustomText({ [e.target.name]: e.target.value }))
    if (readyState === true) { setReadyState(false) }

  }

  /*   function handleChecked(e: any) {
      dispatch(setCustomText({ [e.target.name]: e.target.checked }))
      console.log(e.currentTarget.name, e.target.checked);//debugging
  
    } */

  function completeText() {
    dispatch(setCustomText({ uid: uid, cstTextId: uuidv4() }));
    setReadyState(true);

  }

  async function handleSubmit() {
    completeText();


  }

  //function to remove default message truth value
  /*   async function updateDefault(currentId: string) {
      const q = query(collection(db, "customTexts"), where("default", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((d) => {
        if (d.data().cstTextId !== currentId) {
          let docRef = doc(db, 'customText', d.data().cstTextId);
          updateDoc(docRef, {
            default: false
          })
        }
  
      });
  
  
    } */


  async function sendData() {
    await setDoc(doc(db, 'customTexts', customText.cstTextId), {
      cstTextId: customText.cstTextId,
      message: customText.message,
      title: customText.title,
      uid: customText.uid,
      default: customText.default
    }, { merge: true })
      .then(() => { console.log('submitted to firestore') })
      .catch((err) => alert(err));
    dispatch(resetForm());

    console.log(customText);
  }


  useEffect(() => {

    sendData();
    /*     updateDefault(customText.cstTextId); */

  }, [readyState])

  return (
    <React.Fragment>
      <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
        Add Customized Text
      </Typography>
      <p>   Your current default text message is:
        <span style={{ display: 'block', fontWeight: '800', margin: '5% 30%', padding: '2rem', border: '1px solid black' }}>{defaultText?.message}</span>
        This is the message that will be sent if no specific signal type is chosen.
        You can add personalised messages below.</p>
      {/*      <p>If you wish to set a message as your default message, toggle the checkbox.</p> */}
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
            onChange={handleChange}
          />
        </Grid>
        {/*   <Grid item>
          <FormControlLabel control={<Checkbox id="default" name="default" onChange={handleChecked} />} label="Set as default message" />

        </Grid>
 */}
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