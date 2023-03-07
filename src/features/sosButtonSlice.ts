import { createSlice } from "@reduxjs/toolkit";

export interface SosState {
    active: boolean;
}

const initialState = {
    active: false,
};

export const sosButtonSlice = createSlice({
    name: 'sosButton',
    initialState,
    reducers: {
        activate:(state)=>{ state.active = true }
    }

});


export const { activate } = sosButtonSlice.actions;
export default sosButtonSlice.reducer;