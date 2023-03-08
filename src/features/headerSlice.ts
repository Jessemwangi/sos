import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    popoverState: {
        mainMenu: false,
        profileMenu: false
    }
}



export const headerSlice =
    createSlice({
        name: 'header',
        initialState,
        reducers: {
            togglePopover: (state: any, action: PayloadAction<object>) => { state.popoverState = { ...state.popoverState, ...action.payload } }

        }
    },

    )

export const { togglePopover } = headerSlice.actions;
export default headerSlice.reducer;