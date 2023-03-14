import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from '../app/model';

const initialState = {
    recipientData: []
}
export const firestoreDataSlice = createSlice({
    name: "fireStoreData",
    initialState,
    reducers: {
        setRecipientData: (state: any, action: PayloadAction<Recipient[]>) => { state.recipientData = action.payload }

    }
});

export const { setRecipientData } = firestoreDataSlice.actions;
export default firestoreDataSlice.reducer;
