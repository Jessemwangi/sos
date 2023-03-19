import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    popoverState: {
        mainMenu: false,
        profileMenu: false
    },
    signinModal: false,
    singupModal: false
}

export const headerSlice =
    createSlice({
        name: 'header',
        initialState,
        reducers: {
            togglePopover: (state: any, action: PayloadAction<object>) => { state.popoverState = { ...state.popoverState, ...action.payload } },
            closePopover: (state: any, action: PayloadAction<object>) => { state.popoverState = { ...state.popoverState, ...action.payload } },
            toggleSigninModal: (state:any)=> {state.signinModal = !state.signinModal},
            toggleSignupModal: (state:any)=> {state.signupModal = !state.signupModal}

        }
    },

    )

export const { togglePopover, closePopover, toggleSigninModal, toggleSignupModal } = headerSlice.actions;
export default headerSlice.reducer;