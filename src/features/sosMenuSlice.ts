import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {

}


export const sosMenuSlice = createSlice({
    name: 'sosMenu',
    initialState,
    reducers: {
        selectSos: (state, action: PayloadAction<number>) => {

        }
    }


})

export const { selectSos } = sosMenuSlice.actions;
export default sosMenuSlice.reducer;