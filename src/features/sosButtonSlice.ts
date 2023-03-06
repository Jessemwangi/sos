import { createSlice } from "@reduxjs/toolkit";

export interface SosState {
    active: boolean;
}

const initialState: SosState = {
    active: false,
};

export const sosButtonSlice = createSlice({
    name: 'activeSOS',
    initialState,
    reducers: {
        activate(state) { state.active = true }
    }

});


export const { activate } = sosButtonSlice.actions;
export default sosButtonSlice.reducer;