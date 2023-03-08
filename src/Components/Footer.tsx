import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {

    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Group 5 SOS Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const Footer = () => {
    return (
        <div>
            <Copyright />
        </div>
    );
};

export default Footer;