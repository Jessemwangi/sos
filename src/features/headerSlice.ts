import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { popoverState: false }


export const headerSlice =
    createSlice({
        name: 'header',
        initialState,
        reducers: {
            togglePopover: (state, action: PayloadAction<boolean>) => { state.popoverState = action.payload },
        }
    }
    )

export const { togglePopover } = headerSlice.actions;
export default headerSlice.reducer;