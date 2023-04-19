import { createSlice } from "@reduxjs/toolkit";
import { Recipient } from "../app/model";
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../dataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";


const init: Recipient = {
    id: '',
    createdAt: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    postcode: '',
    uid: '',
    email: ''

}
//const recipients: Recipient[] = []

const initialState = {
    popoverState: false,
    recipient: init,
    currentId: "",
    deletePopoverOpen: false

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },

        setRecipient: (state, action) => {
            state.recipient = { ...state.recipient, ...action.payload }
        },
        resetForm: (state) => {
            state.recipient = init;
        },
        toggleDeletePopover: (state) => { state.deletePopoverOpen = !state.deletePopoverOpen },
    },
});

type Recipients = Recipient[];

export const manageRecipientsApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients'],
    reducerPath: "manageRecipientsApi",

    endpoints: (builder) => ({
        fetchRecipientsById: builder.query<Recipients, { id: string | undefined }>({
            async queryFn(arg) {
                const { id } = arg; //get the value from the object you provide as argument
                try {
                    const q = query(
                        collection(db, 'recipients'),
                        where('uid', '==', id),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let recipients: Recipients = [];
                    querySnapshot?.forEach((doc) => {
                        recipients.push({ id: doc.id, ...doc.data() } as Recipient)
                    });
                    return { data: recipients as Recipients };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Recipients'],
        }),

    })
})

export const { togglePopover, setRecipient, resetForm, toggleDeletePopover } = manageRecipientsSlice.actions;
export const { useFetchRecipientsByIdQuery } = manageRecipientsApi;
export default manageRecipientsSlice.reducer