import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CustomeTextView from '../Components/CustomeTextView';

export default function CustomTextForm() {
  return (
    <React.Fragment>
      <CustomeTextView/>
      <Typography sx={{ mt: '3rem' }} component="h2" variant="h6" color="primary" gutterBottom>
       Add more Customized Text
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Title"
            label="Title"
            fullWidth
            autoComplete="cc-Title"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="Message"
            label="Message"
            fullWidth
            autoComplete="cc-Message"
            variant="standard"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}