import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";

const initialState = {
    recipientData: []
}
type Recipients = Recipient[];

/*Uses code from Medium tutorial example on firebase query with RTK Query (author: Eduardo Motta de Moraes)
https://blog.bitsrc.io/how-to-use-firestore-with-redux-in-a-react-application-f127d35adf3e */


export const firestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients'],
    reducerPath: "firestoreApi",
    endpoints: (builder) => ({
        fetchRecipients: builder.query<Recipients, void>({
            async queryFn() {
                try {
                    const ref = collection(db, 'recipients');
                    const querySnapshot = await getDocs(ref);
                    let recipients: Recipients = [];
                    querySnapshot?.forEach((doc) => {
                        recipients.push({ id: doc.id, ...doc.data() } as Recipient)
                    });
                    return { data: recipients }
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            providesTags: ['Recipients'],
        }),
        setRecipient: builder.mutation({
            async queryFn({ recipientId, details }) {
                try {
                    await updateDoc(doc(db, 'recipients', recipientId), {
                        details
                    });
                    return { data: null };
                }
                catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ['Recipients'],
        })
    })
});
export const { useFetchRecipientsQuery, useSetRecipientMutation } = firestoreApi;



export const firestoreDataSlice = createSlice({
    name: "fireStoreData",
    initialState,
    reducers: {
        setRecipientData: (state: any, action: PayloadAction<Recipient[]>) => { state.recipientData = action.payload }

    }
});


export const { setRecipientData } = firestoreDataSlice.actions;

export default firestoreDataSlice.reducer;

