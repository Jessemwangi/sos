import { createSlice } from "@reduxjs/toolkit";

export interface sosState {
    active: boolean;
}

const initialState: sosState = {
    active: false,
};

export const sosSlice = createSlice({
    name: 'activeSOS',
    initialState,
    reducers: {
        activate(state) { state.active = true }
    }

});


export const { activate } = sosSlice.actions;
export default sosSlice.reducer;