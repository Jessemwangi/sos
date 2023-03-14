import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query';
import { db } from "../DataLayer/FirestoreInit";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";

const initialState = {
    recipientData: []
}
type Recipients = Recipient[];

//borrows code from Medium tutorial example on firebase query with RTK Query (author: Eduardo Motta de Moraes)
export const firestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients'],
    endpoints: (builder) => ({
        fetchRecipients: builder.query<Recipients, void>({
            async queryFn() {
                try {
                    const ref = collection(db, 'recipients');
                    const querySnapshot = await getDocs(ref);
                    let recipients: Recipient[] = [];
                    querySnapshot?.forEach((doc) => {
                        recipients.push({ id: doc.id, ...doc.data() } as Recipient)
                    });
                    return { data: recipients };
                }
                catch (error: any) {
                    return { error: error.message };
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
            invalidatesTags: ['Recipients']
        })
    })
});

export const firestoreDataSlice = createSlice({
    name: "fireStoreData",
    initialState,
    reducers: {
        setRecipientData: (state: any, action: PayloadAction<Recipient[]>) => { state.recipientData = action.payload }

    }
});
//export const { useFetchRecipientsQuery, useSetRecipientMutation } = firestoreApi;

export const { setRecipientData } = firestoreDataSlice.actions;

export default firestoreDataSlice.reducer;
