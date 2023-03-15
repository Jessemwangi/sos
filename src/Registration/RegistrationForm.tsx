import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Guser, Profile } from "../app/model";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile, addProfile } from "../features/ProfileSlice";
import { Button } from "@mui/material";
import { GetDataByTwoColumns2, PostData ,GetDataByTwoColumns} from "../app/functions/DbFunctions";
import { ToastContainer, toast ,ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectSosUser } from "../features/userSlice";


export default function RegistrationForm() {
  const dispatch = useDispatch();
  const sosUser: Guser = useSelector(selectSosUser)
  const user_Profile: Profile = useSelector(selectProfile);
  const [userProfile , setUserProfile]=React.useState<Profile>(user_Profile);
  const [buttonAction, setButtonAction] = React.useState<string>('Save Profile')
  const [currentProfile, setCurrentProfile] = React.useState<Profile>()
  // console.log(userProfile)
  const [datePickerValue, setDatePickerValue] = React.useState<
    Dayjs | null | Date
  >(dayjs());

  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
   

  React.useEffect(() => {
    if (sosUser.email && sosUser.sub) {
      const Firestore_Profile = async () => {
        const retrievedProfile = await GetDataByTwoColumns<Profile>(
          "profile",
          "email",
          userProfile.email,
          "id",
          userProfile.id
        );
        if (retrievedProfile instanceof Error) {
          toast.error(retrievedProfile.message);
        } else if ("data" in retrievedProfile && retrievedProfile.data.length > 0) {
          const profileData = retrievedProfile.data[0];
          setCurrentProfile(profileData);
          console.log(profileData);
          
          // dispatch(
          //   addProfile({
          //     ...profileData,...user_Profile
          //   })
            
          // );
          setButtonAction('Update Profile')
        } else {
          toast.info("No profile data found for You, Create One...");
        }
      }

      Firestore_Profile();
    }
  }, [dispatch, sosUser.email, sosUser.sub, userProfile.email, userProfile.id, user_Profile]);



  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserProfile(user_Profile);
    console.log(user_Profile);
    dispatch(addProfile({ [e.target.name]: e.target.value }));
  };

  const HandlePostProfile = async () => {
    if (userProfile.id && userProfile.email) {
      const Firestore_Profile = await GetDataByTwoColumns2(
        "profile",
        "email",
        userProfile.email,
        "id",
        userProfile.id
      );
      console.log(Firestore_Profile);
      if (Firestore_Profile) {
        setButtonAction('Update Profile')
        // UPdate()
        console.log("profile in our database");
      } else {
        const response: string = await PostData("profile", userProfile);
        console.log("profile needs to be created");
        console.log("response", response);
      }
    } else {

      toast.error("Oops, seems like we need you to log in first!", options);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={sosUser.name.split(" ")[1]}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            value={sosUser.name.split(" ")[0]}
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Contact"
            name="contact"
            value={userProfile.contact ? userProfile.contact : ""}
            label="Contacts"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="AltContact"
            name="altcontact"
            value={userProfile.altcontact ? userProfile.altcontact : ""}
            label="Alt Contacts"
            fullWidth
            autoComplete="Alt Phone Number"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
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
                dispatch(addProfile({ dob: newValue }));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Email"
            name="emailaddress"
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
            id="zip"
            name="postalcode"
            value={userProfile.postalcode ? userProfile.postalcode : ""}
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
            onClick={HandlePostProfile}
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

