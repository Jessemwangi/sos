import { createSlice } from '@reduxjs/toolkit';
import { SignalsList } from '../app/model';


const init: SignalsList = {
    id: "",
    uid: "",
    name: "",
    recipients: [""],
    presetMsg: "",
    cstTextId: "",
    createdAt: "",
    pinned: false,
    default: false
}

//modify a signal, delete a signal, add a new signal to signalsList

const manageSignalSlice = createSlice({
    name: 'manageSignals',
    initialState: {
        signalsList: init,
        popoverState: false,
        deletePopoverOpen: false
    },
    reducers: {
        setSignalsList: (state, action) => {
            state.signalsList = { ...state.signalsList, ...action.payload };
        },
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        resetForm: (state) => {
            state.signalsList = init;
        },
        toggleDeletePopover: (state) => { state.deletePopoverOpen = !state.deletePopoverOpen },

    }
});



export const { setSignalsList, resetForm, toggleDeletePopover, togglePopover } = manageSignalSlice.actions;
export default manageSignalSlice.reducer