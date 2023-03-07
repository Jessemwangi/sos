import React from 'react';
import RecipientsViews from '../Components/RecipientsViews';
import { Typography } from '@mui/material';


const ManageRecipients = () => {


    return (
        <div>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Available Recipients
            </Typography>
            <RecipientsViews />
        </div>
    );
};

export default ManageRecipients;