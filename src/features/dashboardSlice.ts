import { createSlice } from "@reduxjs/toolkit";

const init = {
    id: "",
    uid: "",
    name: "",
    recipients: [],
    presetMsg: "",
    cstTextId: "",
    createdAt: "",
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        selectedSignal: init,
        activeSos: false,
        defaultSignal: init,
        sentSignalId: ""
    },
    reducers: {
        activate: (state, action) => { state.activeSos = action.payload },
        setDefaultSignal: (state, action) => { state.defaultSignal = ({ ...state.defaultSignal, ...action.payload }) },
        selectSos: (state, action) => {
            state.selectedSignal = { ...state.selectedSignal, ...action.payload }
        },
        setSentSignalId: (state, action) => {state.sentSignalId = action.payload}

    },
}
);

export const { activate, setDefaultSignal, selectSos, setSentSignalId } = dashboardSlice.actions;
export default dashboardSlice.reducer;