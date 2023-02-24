import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Guser } from '../app/model';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface googleUser{
  sosUser: Guser
}
export default function RegistrationForm( {sosUser}:googleUser) {
  const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(
    dayjs() );
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        
      </Typography>
      <Grid container spacing={3}>
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
            name="Contact"
            label="Contacts"
            fullWidth
            autoComplete="Phone Number"
            variant="standard"
          />
           </Grid>
           <Grid item xs={12} sm={6}>
          <TextField
            required
            id="AltContact"
            name="AltContact"
            label="Alt Contacts"
            fullWidth
            autoComplete="Alt Phone Number"
            variant="standard"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
        <DatePicker 
        label="Date of Birth"
          value={datePickerValue}
          onChange={(newValue) => setDatePickerValue(newValue)}
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
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="Reachable address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="Reachable address-line2"
            variant="standard"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="Reachable postal-code"
            variant="standard"
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