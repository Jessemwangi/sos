import RecipientsViews from '../Components/RecipientsViews';
import { Typography } from '@mui/material';
import { auth } from '../app/services/FirebaseAuth'

const ManageRecipients = () => {

    const user = auth.currentUser;

    if (!user) { return <><h3>Please log in first to manage your contacts.</h3></> }

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