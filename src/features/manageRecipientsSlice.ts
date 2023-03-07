import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from '../app/model';


const recipient: Recipient = {
    id: "",
    createdAt: "",
    name: "",
    address: "",
    city: "",
    phone: "",
    postcode: "",
};

const initialState = {
    popoverState: false,
    currentAnchorElement: '0',
    currentRecipient: recipient

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        updateAnchorElement: (state, action: PayloadAction<string>) => { state.currentAnchorElement = action.payload },
        setContact: (state, action: PayloadAction<object>) => { state.currentRecipient = { ...state.currentRecipient, ...action.payload } }
    },

});

export const { togglePopover, updateAnchorElement, setContact } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer