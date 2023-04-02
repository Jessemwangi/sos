import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import {  toast } from "react-toastify";
import { Grid, Button, Typography, TextField, LinearProgress } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import {  doc, updateDoc} from "@firebase/firestore";
import { db } from '../DataLayer/FirestoreInit';
import { useFetchProfileQuery } from '../app/services/firestoreAPI';
import { auth } from "../app/services/FirebaseAuth";
import { setProfile, updateProfile } from "../features/profileSlice";

const ProfileForm =() => {

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const storeProfile = useSelector((state: any) => state.profile.userProfile);
  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null | Date>(dayjs());
  const [loadingState, setLoading] = useState<boolean>(true)
  const [profileError, setProfileError] = useState<any>()

  const uid = user?.uid ? user.uid : '';

  const { data, error, isFetching } = useFetchProfileQuery("JVn0ba4deUhF2wEmhcsKEfOTLWG3"); //pull uid from store instead of auth user object to avoid uid load errors
  
  useEffect(() => {
    setLoading(isFetching)
    setProfileError(error)
    if (data) {
      dispatch(setProfile(data))
    }
    
  }, [data, dispatch, error, isFetching])

  const [buttonAction, setButtonAction] = useState<string>('Save Profile')

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(updateProfile({ [e.target.name]: e.target.value}));
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'profile', "JVn0ba4deUhF2wEmhcsKEfOTLWG3"), storeProfile)
      toast.success("Information updated successfully!")
    } catch (error: any) {
      console.log(error)
      toast.error("Information updated Failed!")

    }

  }

  // useEffect(() => {
  //   if (!user?.uid) {
  //     toast.error("Oops, seems like we need you to log in first!");
  //     dispatch(toggleSigninModal(true))
     
  //   }
  // }, [user?.uid]);


  return (
    <>
  
    {
      loadingState ?
          (<>
            <LinearProgress color="secondary" />
          </>)
        :
        (
          <React.Fragment>
    <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstname"
            name="firstname"
            label="First name"
            fullWidth
            value={storeProfile.firstname} //u
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => { handleChange(e) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            value={storeProfile.lastname}
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            value={storeProfile.phone ? storeProfile.phone : ""}
            label="Phone Number"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="altphone"
            name="altphone"
            value={storeProfile.altphone ? storeProfile.altphone : ""}
            label="Alternative Phone Number"
            fullWidth
            autoComplete="Alt Phone Number"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="occupation"
            name="occupation"
            value={storeProfile.occupation ? storeProfile.occupation : ""}
            label="occupation"
            fullWidth
            autoComplete="occupation"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en"}>
            <DatePicker
              label="Date of Birth"
              value={datePickerValue}
              onChange={(newValue) => {
                setDatePickerValue(
                  storeProfile.dob ? storeProfile.dob : newValue
                );
                 dispatch(updateProfile({ dob: newValue?.toString() }));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            value={storeProfile.email}
            autoComplete="Email Address"
            variant="standard"

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="addressline1"
            value={storeProfile.addressline1 ? storeProfile.addressline1 : ""}
            label="Address line 1"
            fullWidth
            autoComplete="Reachable address-line1"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="addressline2"
            label="Address line 2"
            value={storeProfile.addressline2 ? storeProfile.addressline2 : ""}
            fullWidth
            autoComplete="Reachable address-line2"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={storeProfile.city ? storeProfile.city : ""}
            label="City"
            fullWidth
            autoComplete="Reachable address-level2"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state_province"
            value={storeProfile.state_province ? storeProfile.state_province : ""}
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postcode"
            name="postcode"
            value={storeProfile.postcode ? storeProfile.postcode : ""}
            label="Zip / Postal code"
            fullWidth
            autoComplete="Reachable postal-code"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            value={storeProfile.country ? storeProfile.country : ""}
            label="Country"
            fullWidth
            autoComplete="Resident country"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
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
        
      </Grid>
      </React.Fragment >
  )
      }
        </>
  );
}

export default ProfileForm;

