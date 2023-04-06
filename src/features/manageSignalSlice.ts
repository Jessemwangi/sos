import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignalsList } from '../app/model';


const init = {

    signalId: "",
    uid: "", //firebase uid
    name: "",
    recipientId: [""],
    presetMsg: "", //is this neccessary? 
    cstTextId: "",
    createdAt: new Date()

}

//modify a signal, delete a signal, add a new signal to signalsList

const manageSignalSlice = createSlice({
    name: 'manageSignals',
    initialState: {
        signal: init,
    },
    reducers: {
        setSignal: (state, action) => {
            const signal: SignalsList = (action.payload);
        },
        updateSignal: (state, action) => {
            state.signal = { ...state.signal, ...action.payload }
        },
        resetForm: (state) => {
            state.signal = init;
        }
    }


});

export const { setSignal } = manageSignalSlice.actions;
export default manageSignalSlice.reducer
