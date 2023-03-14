import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "@firebase/firestore";

//import { Recipient } from '../app/model';
//import { rowsArray } from '../Components/rows';
import { db } from "../DataLayer/FirestoreInit";


//const recipients: object[] = rowsArray;
const recipients = collection(db, 'recipients');

const initialState = {
    popoverState: false,
    currentAnchorElementId: '',
    recipients: recipients,
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