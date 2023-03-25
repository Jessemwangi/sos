import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { Grid, Button, Typography, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'react-toastify/dist/ReactToastify.css';

import {
  serverTimestamp,
  getDoc,
  doc,
  addDoc, setDoc, updateDoc
} from "@firebase/firestore";
import { db } from '../DataLayer/FirestoreInit';


import { useFetchProfileQuery, useSetProfileMutation } from '../app/services/firestoreAPI';
//import { PostDocById } from "../app/services/DbFunctions";
import { Profile } from "../app/model";
import { AuthContext } from "../app/services/FirebaseContext";
import { updateProfile } from "../features/profileSlice";

function ProfileForm() {

  const dispatch = useDispatch();
  const user = useContext(AuthContext);

  const sosUser = useSelector((state: any) => state.user.sosUser);
  const storeProfile = useSelector((state: any) => state.profile.userProfile);
  const loggedIn = useSelector((state: any) => state.user.loggedIn);

  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null | Date>(dayjs());

  const init: Profile = {

    firstname: "",
    lastname: "",
    phone: "",
    altphone: "",
    occupation: "",
    dob: null,
    uid: sosUser.uid,
    email: sosUser.email,
    username: "",
    addressline1: "",
    addressline2: "",
    city: "",
    state_province: "",
    postcode: "",
    country: "",
    createdAt: null,
  };



  const [userProfile, setUserProfile] = useState<Profile>(init);

  const profileData: any = {
    firstname: userProfile.firstname,
    lastname: userProfile.lastname,
    phone: userProfile.phone,
    altphone: userProfile.altphone,
    occupation: userProfile.occupation,
    dob: userProfile.dob,
    uid: sosUser.uid,
    email: sosUser.email,
    username: userProfile.username,
    addressline1: userProfile.addressline1,
    addressline2: userProfile.addressline2,
    city: userProfile.city,
    state_province: userProfile.state_province,
    postcode: userProfile.postcode,
    country: userProfile.country,
    createdAt: new Date()
  };


  //useSetProfileMutation(sosUser.uid, userProfile);


  const [buttonAction, setButtonAction] = useState<string>('Save Profile')
  //const [currentProfile, setCurrentProfile] = useState<Profile>()


  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };


  const { data, error } = useFetchProfileQuery(sosUser.uid); //pull uid from store instead of auth user object to avoid uid load errors
  /*   if (!data) {
      console.log('data not defined');
      //toast.info("No profile data was found for you, create your profile here");
    } else {
      //setButtonAction('Update Profile'); triggers infinite loop
  
    } */

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserProfile({ ...userProfile, uid: sosUser.uid, email: sosUser.email, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    /*  const response = PostDocById('profile', { ...userProfile }, sosUser.uid); */
    //=>invalid hook call. Try calling firebase functions directly? 
    try {
      await updateDoc(doc(db, 'profile', sosUser.uid), profileData)
      /*  .then(() => {
         setResponse("Document has been added successfully");
       }); */
    } catch (error: any) {
      /* setError(`An error occured ... ${error.message}`);
      setResponse(`An error occured ... ${error.message}`); */
      console.log(error);
    }

  }

  useEffect(() => {
    if (!data) {
      return;
    } else {
      dispatch(updateProfile({ ...userProfile }));
    }
  }, [dispatch, userProfile]);

  /*
 if(!user.uid){toast.error("Oops, seems like we need you to log in first!", options);}
   */

  return (
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
            value={storeProfile.firstname ? storeProfile.firstname : ""} //u
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
                // dispatch(addProfile({ dob: newValue }));
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
            value={sosUser.email}
            autoComplete="Email Address"
            variant="standard"

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="addressline1"
            value={userProfile.addressline1 ? userProfile.addressline1 : ""}
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
            value={userProfile.addressline2 ? userProfile.addressline2 : ""}
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
            value={userProfile.city ? userProfile.city : ""}
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
            value={userProfile.state_province ? userProfile.state_province : ""}
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
            value={userProfile.postcode ? userProfile.postcode : ""}
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
            value={userProfile.country ? userProfile.country : ""}
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
        <ToastContainer />
      </Grid>
    </React.Fragment>
  );
}

export default ProfileForm;

