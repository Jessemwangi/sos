import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    popoverState: {
        mainMenu: false,
        profileMenu: false
    },
    signinModal: false,
    signupModal: false
}

export const headerSlice =
    createSlice({
        name: 'header',
        initialState,
        reducers: {
            togglePopover: (state: any, action: PayloadAction<object>) => { state.popoverState = { ...state.popoverState, ...action.payload } },
            closePopover: (state: any, action: PayloadAction<object>) => { state.popoverState = { ...state.popoverState, ...action.payload } },
            toggleSigninModal: (state:any, action: PayloadAction<boolean>)=> {state.signinModal = action.payload},
            toggleSignupModal: (state:any, action: PayloadAction<boolean>)=> {state.signupModal = action.payload}

        }
    },

    )

export const { togglePopover, closePopover, toggleSigninModal, toggleSignupModal } = headerSlice.actions;
export default headerSlice.reducer;