import { createSlice } from "@reduxjs/toolkit";

export interface SosState {
    active: boolean;
}

const initialState: SosState = {
    active: false,
};

export const sosButtonSlice = createSlice({
    name: 'sosButton',
    initialState,
    reducers: {
        activate: (state, action) => { state.active = action.payload }
    }
}
);


export const { activate } = sosButtonSlice.actions;
export default sosButtonSlice.reducer;