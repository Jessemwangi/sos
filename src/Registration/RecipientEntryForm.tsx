import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import RecipientsViews from '../Components/RecipientsViews';

export default function RecipientEntryForm() {

  

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
    </React.Fragment>
  );
}