import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipient } from "../app/model";

const recipient:Recipient = {
    id:'',
    createdAt:'',
    name:'',
    address:'',
    phone:'',
    city:'',
    postcode:'',
    userId:'',
    email:''

}
const recipients:Recipient[] =[]

const initialState = {
    popoverState: false,
    currentAnchorElementId: '',
    recipient:recipient,
    recipients: recipients,
    currentId: 0

}

export const manageRecipientsSlice = createSlice({
    name: "manageRecipients",
    initialState,
    reducers: {
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        updateAnchorElementId: (state, action: PayloadAction<string>) => { 
            state.currentAnchorElementId = action.payload },
        saveContacts: (state: any, action: PayloadAction<object>) => { 
            state.recipients = action.payload },
        updateCurrentId: (state, action) => { state.currentId = action.payload },
        setRecipientData: (state: any, action: PayloadAction<Recipient[]>) => { 
            state.recipientData = action.payload
        },
        setRecipients: (state, action) => {
            const recipients:Recipient[] = (action.payload); 
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

export const { togglePopover, updateAnchorElementId, saveContacts, updateCurrentId,setRecipients,updateRecipient,resetForm } = manageRecipientsSlice.actions;
export default manageRecipientsSlice.reducer