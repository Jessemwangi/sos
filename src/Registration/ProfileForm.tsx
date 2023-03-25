import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import { Grid, Button, Typography, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'react-toastify/dist/ReactToastify.css';

import { useFetchProfileQuery, useSetProfileMutation } from '../app/services/firestoreAPI';
import { Profile } from "../app/model";
import { AuthContext } from "../app/services/FirebaseContext";


function ProfileForm() {

  const dispatch = useDispatch();
  const user = useContext(AuthContext);

  const sosUser = useSelector((state: any) => state.user.sosUser);
  const loggedIn = useSelector((state: any) => state.user.loggedIn);
  console.log(sosUser.email);


  const [datePickerValue, setDatePickerValue] = useState<Dayjs | null | Date>(dayjs());

  const init: Profile = {
    /*  id: '', */
    firstname: "",
    lastname: "",
    phone: "",
    altphone: "",
    occupation: "",
    dob: null,
    uid: sosUser.uid,
    email: "",
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
  const [buttonAction, setButtonAction] = useState<string>('Save Profile')
  //const [currentProfile, setCurrentProfile] = useState<Profile>()

  console.log(userProfile);

  const {
    data,
    isFetching,
    error
  } = useFetchProfileQuery(sosUser.uid); //pull uid from store to avoid uid load errors?

  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };


  //setButtonAction('Update Profile');
  /* toast.info("No profile data was found for you."); */

  const handleChange = (e: any) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    //dispatch(addProfile({ [e.target.name]: e.target.value }));
  };

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
            value={userProfile.firstname} //u
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastname"
            name="lastname"
            label="Last name"
            fullWidth
            value={userProfile.lastname}
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
            defaultValue={userProfile.phone ? userProfile.phone : ""}
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
            value={userProfile.altphone ? userProfile.altphone : ""}
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
            value={userProfile.occupation ? userProfile.occupation : ""}
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
                  userProfile.dob ? userProfile.dob : newValue
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
            /*  onClick={useSetProfileMutation(sosUser.uid, {...userProfile})} */
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

