import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Recipient } from '../app/model';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

import {
  doc,
  addDoc, setDoc, updateDoc, collection
} from "@firebase/firestore";
import { db } from '../DataLayer/FirestoreInit';

import RecipientsViews from '../Components/RecipientsViews';
import { AuthContext } from "../app/services/FirebaseContext";

export default function RecipientEntryForm() {

  const dispatch = useDispatch();
  const user = useContext(AuthContext);
  const sosUser = useSelector((state: any) => state.user.sosUser);



  const init: Recipient = {
    id: "",
    createdAt: "",
    name: "",
    address: "",
    phone: "",
    city: "",
    postcode: "",
    userId: sosUser.uid
  }
  const [recipient, setRecipient] = useState<Recipient>(init);

  const recipientData: Recipient = {
    id: recipient.id,
    createdAt: "",
    name: recipient.name,
    address: recipient.address,
    phone: recipient.phone,
    city: recipient.city,
    postcode: recipient.postcode,
    userId: sosUser.uid
  }



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'recipients'), recipientData)
        .then(() => {
          console.log("Document has been added successfully");
        });
    } catch (error: any) {
      /* setError(`An error occured ... ${error.message}`);
      setResponse(`An error occured ... ${error.message}`); */
      console.log(error);
    }

  }



  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Your Recipients
      </Typography> */}
      <RecipientsViews />

      <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
        Add More Recepients
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Name"
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
            label="Address"
            fullWidth
            autoComplete="cc-Address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Phone"
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
            label="Email Address"
            fullWidth
            autoComplete="cc-Email"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="post-Code"
            label="post Code"
            helperText="post Code and street number"
            fullWidth
            autoComplete="cc-post-Code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="city"
            label="City"
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
         {/*  {buttonAction} */}
        </Button>
      </Grid>
    </React.Fragment>
  );
}