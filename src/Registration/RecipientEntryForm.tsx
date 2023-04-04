import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import {
  doc, setDoc,
} from "@firebase/firestore";

import RecipientsViews from '../Components/RecipientsViews';
import { useFetchRecipientsQuery } from '../app/services/firestoreAPI';
import { db } from '../DataLayer/FirestoreInit';
import { Recipient } from '../app/model';
import { auth } from '../app/services/FirebaseAuth';
import { resetForm, setRecipients, updateRecipient } from '../features/manageRecipientsSlice';

const RecipientEntryForm = () => {

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [loadingState, setLoading] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<any>()

  const recipient: Recipient = useSelector((state: any) => state.manageRecipients.recipient);
  const [buttonAction, setButtonAction] = useState<string>('Save Profile')

  const uid = user?.uid ? user.uid : '';

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
    } else if (user && !data) {
      dispatch(updateRecipient({ userId: uid, id: uuidv4() }))
    }

  }, [data, dispatch, error, isFetching, uid, user])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {

      await setDoc(doc(db, 'recipients', recipient.id), { ...recipient })
      toast.success("Recepient created successfully!")
      dispatch(resetForm())

    } catch (error: any) {
      console.log(error)
      toast.error("Transaction Failed!")

    }
    setLoading(false)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(updateRecipient({ [e.target.name]: e.target.value }));
  };


  return (
    <>

      {
        loadingState ?
          (<>
            <LinearProgress color="secondary" />
          </>)
          :
          (
            profileError ?
              (
                <>
                  <h1>OOOppps!!! this is not your fault, it on us, </h1>
                  <p>the following error occured {profileError}</p>
                </>
              ) : (
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
                        id="post-Code"
                        name='postcode'
                        value={recipient.postcode}
                        label="post Code"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
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
                </React.Fragment>)
          )
      }
    </>
  );
}

export default RecipientEntryForm;