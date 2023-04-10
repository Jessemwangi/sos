import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from '../app/services/FirebaseAuth'
import RecipientEntryForm from '../Registration/RecipientEntryForm'
import RecipientsView from '../Components/RecipientsView'

const ManageRecipients = () => {

    const [user] = useAuthState(auth);

    if (!user) { return <><h3>Please log in first to manage your contacts.</h3></> }

    return (
        <div style={{ padding: '2rem' }}>
            <RecipientsView />
            <RecipientEntryForm />
        </div>
    );
};

export default ManageRecipients;