import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Recipient } from '../app/model';
import { v4 as uuidv4 } from 'uuid';

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
import { resetForm, setRecipients, updateRecipient } from '../features/manageRecipientsSlice';

 const RecipientEntryForm = () => {

  const dispatch = useDispatch();
   const [user] = useAuthState(auth);
   const [loadingState, setLoading] = useState<boolean>(true)
   const [profileError, setProfileError] = useState<any>()

   const [buttondisplay, setButtonDisplay] = useState<string>('Save Recepient')
  //  const [recipientData, setRecipientData] = useState();
   const recipientData = useSelector((state: any) => state.manageRecipients.recipients);
   const recipient = useSelector((state: any) => state.manageRecipients.recipient);
   const [buttonAction, setButtonAction] = useState<string>('Save Profile')
   
   const uid = user?.uid ? user.uid : '';
   let recipientId;

const {
  data,
  isFetching,
  error
} = useFetchRecipientsQuery({ para1: uid });
useEffect(() => {
  if (!user) {
    return;
  }
  setLoading(isFetching)
  setProfileError(error)
  if (data?.length! > 0) {
    dispatch(setRecipients(data))
    setButtonAction("Update Profile")
  } else if(user && !data) {
    dispatch(updateRecipient({userId:uid, id: uuidv4()}))
  }
  
}, [data, dispatch, error, isFetching, uid, user])
   
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await setDoc(doc(db,'recipients',recipient.id),{...recipient})
      toast.success("Recepient created successfully!")
      dispatch(resetForm())
      
    } catch (error: any) {
      console.log(error)
      toast.error("Transaction Failed!")

    }

  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(updateRecipient({ [e.target.name]: e.target.value}));
  };

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
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
            fullWidth
            autoComplete="cc-Address"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Phone"
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
            onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
  );
 }

export default RecipientEntryForm;