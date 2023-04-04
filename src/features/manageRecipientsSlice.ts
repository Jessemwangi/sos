import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from "../app/model";

const recipient: Recipient = {
    id: '',
    createdAt: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    postcode: '',
    userId: '',
    email: ''

}
const recipients: Recipient[] = []

const initialState = {
    popoverState: false,
    recipient: recipient,
    recipients: recipients,
    currentId: ""

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },

        setRecipients: (state, action) => {
            const recipients: Recipient[] = (action.payload);
            state.recipients = { ...recipients };
        },

        updateRecipient: (state, action) => {
            state.recipient = { ...state.recipient, ...action.payload }

        },
        resetForm: (state) => {
            state.recipient = recipient;
        }

    },
});

export const { togglePopover, setRecipients, updateRecipient, resetForm } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer