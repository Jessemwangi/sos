import { createSlice } from "@reduxjs/toolkit";


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        activeSos: false,
    },
    reducers: {
        activate: (state, action) => { state.activeSos = action.payload }
    },
    /*  selectSos: (state, action: PayloadAction<SignalsList>) => {
         state.signal = {state.signal, ...action.payload}
     } */
}
);

export const { activate } = dashboardSlice.actions;
export default dashboardSlice.reducer;