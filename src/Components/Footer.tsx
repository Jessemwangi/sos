import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Copyright() {

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href='https://github.com/Jessemwangi/sos'>
        Built by Jesse Mwangi and Anna Petelin | © Helsinki Business College {new Date().getFullYear()}
      </Link>
    </Typography>
  );
}
const Footer = () => {
  return (
    <div style={{ height: '5vh'}}>
      <Copyright />
      <Typography variant="body2" color="text.secondary" align="center">This app requires use of the geolocation API. By using this app you agree to allow the browser to use your location. </Typography>
    </div>
  );
};

export default Footer;