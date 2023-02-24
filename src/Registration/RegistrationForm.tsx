import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Guser, Profile } from '../app/model';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile,addProfile } from '../features/Profile';

interface googleUser{
  sosUser: Guser
}

export default function RegistrationForm({ sosUser }: googleUser) {
  const dispatch = useDispatch()
  const userProfile: Profile = useSelector(selectProfile)
  console.log(userProfile)
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs());
  
  React.useEffect(() => {
    if (sosUser.email) {
      dispatch(addProfile({ 
        email: sosUser.email,
        firstname: sosUser.name.split(' ')[1],
        lastname: sosUser.name.split(' ')[0],
      }))
      
    }
  },[dispatch, sosUser])
  
  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(addProfile({ [e.target.name]:e.target.value }))
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <Grid container spacing={3}>
        <>{console.log(userProfile)}
        </>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={sosUser.name.split(' ')[1]}
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
            value={sosUser.name.split(' ')[0]}
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Contact"
            name="contact"
            label="Contacts"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
            value={userProfile.contact}
            onChange={(e) => handleChange(e)}
          />
           </Grid>
           <Grid item xs={12} sm={6}>
          <TextField
            required
            id="AltContact"
            name="altcontact"
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
            label="occupation"
            fullWidth
            autoComplete="occupation"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
            <DatePicker 
            
        label="Date of Birth"
          value={datePickerValue}
             onChange={(newValue) => {
                 setDatePickerValue(newValue)
                dispatch(addProfile({ dob:new Date(newValue!.toISOString()) }))
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
            value={userProfile.addressline1 ? userProfile.addressline1 :''}
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
            value={userProfile.addressline2 ? userProfile.addressline2 :''}
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
            label="Country"
            fullWidth
            autoComplete="Resident country"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}