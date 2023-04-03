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
import { useFetchRecipientsQuery } from '../app/services/firestoreAPI';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';
import { toast } from 'react-toastify';

 const RecipientEntryForm = () => {

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
   const [buttondisplay, setButtonDisplay] = useState<string>('Save Recepient')
  //  const [recipientData, setRecipientData] = useState();
   const recipientData = useSelector((state: any) => state.manageRecipients.recipients);

   const uid = user?.uid ? user.uid : '';

const {
  data,
  isFetching,
  error
} = useFetchRecipientsQuery({ para1: 'm9efSleBytTPMGzYyfMRQxDUjsQ2' });
   console.log(data,'isFetching', isFetching, 'error', error)
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (data?.length! > 0) {        
        await updateDoc(doc(db, 'recipients', uid), { ...recipientData})
        toast.success("Information updated successfully!")
      }
      else {

        await setDoc(doc(db,'recipients',uid),{...recipientData})
        toast.success("Recepient created successfully!")
      }
    } catch (error: any) {
      console.log(error)
      toast.error("Transaction Failed!")

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
            fullWidth
            autoComplete="cc-Address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Phone"
            name='phone'
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
            name='postcode'
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
            name='city'
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
           {buttondisplay} 
        </Button>
      </Grid>
    </React.Fragment>
  );
 }

export default RecipientEntryForm;