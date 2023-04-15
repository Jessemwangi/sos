import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from '../app/services/FirebaseAuth'
import RecipientEntryForm from '../registration/RecipientEntryForm'
import RecipientsView from '../components/RecipientsView'
import { useFetchRecipientsByIdQuery } from '../features/manageRecipientsSlice';

const ManageRecipients = () => {

    const [user] = useAuthState(auth);
    const uid = user?.uid ? user.uid : '';
    const {
        data,
        isFetching,
        error
    } = useFetchRecipientsByIdQuery({ id: uid });

    if (!user) { return <><h3>Please log in first to manage your contacts.</h3></> }



    return (
        <div style={{ padding: '2rem' }}>
            <RecipientsView data={data} isFetching={isFetching} error={error} />
            <RecipientEntryForm />
        </div>
    );
};

export default ManageRecipients;