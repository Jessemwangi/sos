import { Typography } from '@mui/material';
import { auth } from '../app/services/FirebaseAuth'
import { useAuthState } from "react-firebase-hooks/auth";
import RecipientEntryForm from '../Registration/RecipientEntryForm';

const ManageRecipients = () => {

    const [user] = useAuthState(auth);

    if (!user) { return <><h3>Please log in first to manage your contacts.</h3></> }

    return (
        <div style={{ padding: '2rem' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Available Recipients
            </Typography>
            <RecipientEntryForm />
        </div>
    );
};

export default ManageRecipients;