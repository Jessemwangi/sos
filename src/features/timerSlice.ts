import { createSlice } from "@reduxjs/toolkit";


export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        start: true,

    },
    reducers: {
        setTimer: (state: any) => {
            state.start = true
        },
        toggleActive: (state: any) => {
            state.start = true
        }
    },

});


export const { setTimer, toggleActive } = timerSlice.actions;
export default timerSlice.reducer;