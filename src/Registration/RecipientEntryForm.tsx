import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import {
  doc, setDoc, /* serverTimestamp, Timestamp */
} from "@firebase/firestore";

import { db } from '../DataLayer/FirestoreInit';
import { Recipient } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { resetForm, setRecipient } from '../features/manageRecipientsSlice';
import { manageRecipientsApi } from '../features/manageRecipientsSlice';

const RecipientEntryForm = () => {
  //used for creating and adding a new recipient to the database
  //available from registration form and manageRecipients page

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const uid = user?.uid;

  const [buttonAction] = useState('Save Recipient');
  const [readyState, setReadyState] = useState<boolean>(false);
  const recipient: Recipient = useSelector((state: any) => state.manageRecipients.recipient);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setRecipient({ [e.target.name]: e.target.value }));
    if (readyState === true) { setReadyState(false) }
  };

  const completeData = () => {
    dispatch(setRecipient({ uid: uid, id: uuidv4() }));

    setReadyState(true);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    completeData();

  }

  //TODO: check that serverTimestamp is causing type or serializavle data problems when loading from firebase
  // --> yes

  async function sendData() {
    await setDoc(doc(db, 'recipients', recipient.id), {
      id: recipient.id,
      createdAt: /* serverTimestamp() */"",
      name: recipient.name,
      address: recipient.address,
      phone: recipient.phone,
      city: recipient.city,
      postcode: recipient.postcode,
      uid: recipient.uid,
      email: recipient.email
    }).then(() => toast.success("Recipient created successfully!"))
      .catch((err) => alert(err));
    dispatch(resetForm());

  }


  useEffect(() => {
    sendData();
    dispatch(manageRecipientsApi.util.invalidateTags(['Recipients']));
    //setLoading(true)
    //eslint-disable-next-line
  }, [readyState])


  return (
    <>
      <React.Fragment>
        <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
          Add at least one default SOS Recipient
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Name"
              value={recipient.name}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              name='name'
              label="Name"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Address"
              name='address'
              label="Address"
              value={recipient.address}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              fullWidth
              autoComplete="cc-Address"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Phone"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              name='phone'
              value={recipient.phone}
              label="Phone Number"
              fullWidth
              autoComplete="cc-Phone"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="Email"
              name='email'
              value={recipient.email}
              label="Email Address"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              fullWidth
              autoComplete="cc-Email"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="postcode"
              name='postcode'
              value={recipient.postcode}
              label="Post Code"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              helperText="postcode and street number"
              fullWidth
              autoComplete="cc-postcode"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="city"
              name='city'
              value={recipient.city}
              label="City"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
              helperText="City Name"
              fullWidth
              autoComplete="cc-city-Name"
              variant="standard"
            />
          </Grid>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e)}
            sx={{ mt: 3, ml: 1 }}
          >
            {buttonAction}
          </Button>
        </Grid>
      </React.Fragment>
    </>
  );
}


export default RecipientEntryForm;