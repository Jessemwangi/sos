import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Recipient } from '../app/model';
//import { rowsArray } from '../Components/rows';

//const recipients: Recipient[] = rowsArray;


const initialState = {
    popoverState: false,
    currentAnchorElementId: '',
    recipients: [],
    currentId: 0

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        updateAnchorElementId: (state, action: PayloadAction<string>) => { state.currentAnchorElementId = action.payload },
        /* saveContacts: (state: any, action: PayloadAction<object[]>) => { state.recipients = [...state.recipients, { ...action.payload }] }, */

        saveContacts: (state: any, action: PayloadAction<object[]>) => { state.recipients = action.payload },
        updateCurrentId: (state, action) => { state.currentId = action.payload }

    },
});

export const { togglePopover, updateAnchorElementId, saveContacts, updateCurrentId } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer