import { createSlice } from "@reduxjs/toolkit";
import { Recipient } from "../app/model";

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
const recipients: Recipient[] = []

const initialState = {
    popoverState: false,
    recipient: init,
    recipients: recipients,
    currentId: ""

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        /* 
                setRecipients: (state, action) => {
                    const recipients: Recipient[] = (action.payload);
                    state.recipients = { ...recipients };
                }, */

        setRecipient: (state, action) => {
            state.recipient = { ...state.recipient, ...action.payload }

        },
        resetForm: (state) => {
            state.recipient = init;
        }

    },
});

export const { togglePopover, setRecipient, resetForm } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer