import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from '../app/model';
//import recipient data from db here?
import { rowsArray } from '../Components/rows';

const recipients: Recipient[] = rowsArray;

const initialState = {
    popoverState: false,
    currentAnchorElementId: '',
    recipients: recipients,
    currentIndex: 0

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        updateAnchorElementId: (state, action: PayloadAction<string>) => { state.currentAnchorElementId = action.payload },
        saveContact: (state: any, action: PayloadAction<object>) => { state.recipients = [...state.recipients, { ...action.payload }] },
        updateCurrentIndex: (state, action) => { state.currentIndex = action.payload }
    },

});

export const { togglePopover, updateAnchorElementId, saveContact, updateCurrentIndex } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer