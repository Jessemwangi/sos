import { createSlice } from "@reduxjs/toolkit";

import { Signal, SignalsList, GeoCodes } from '../app/model';
import { auth } from '../app/services/FirebaseAuth'
import { useAuthState } from "react-firebase-hooks/auth";

//used for state of triggered SOS request


const init: Signal = {
    id: "",
    uid: "",
    createdAt: "",
    geolocation: {
        lat: 0,
        lon: 0
    }
}

export const signalSlice = createSlice({
    name: 'signal',
    initialState: {
        signal: init,
        signalId: ""
    },
    reducers: {
        //in MenuSlice: onClick dispatches an action to set the signalId
        setSignal: (state: any, action) => {
            state.signal = action.payload
        },
        //fetch corresponding message and recipients from db
        //where is geolocation triggered? in Timeout function? Timer dispatches geolocation to store?
    }


})


export const { setSignal } = signalSlice.actions;
export default signalSlice.reducer;