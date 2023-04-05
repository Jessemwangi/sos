import { createSlice } from "@reduxjs/toolkit";

import { signal, SignalsList, geoCodes } from '../app/model';
import { auth } from '../app/services/FirebaseAuth'


const user = auth.currentUser!;

/*

export interface signal {
    signalId: string,
    uid: string,
    createdAt: Date,
    geolocation: geoCodes
}

export interface SignalsList {
    signalId: string,
    uid: string,
    name: string,
    recipientId: string[],
    presetMsg: string,
    cstTextId?: string,
    createdAt?: Date
}

interface geoCodes {
    lat: number,
    lon: number
}


*/

const initialState: signal = {
    signalId: "",
    uid: user.uid,
    createdAt: new Date(),
    geolocation: {
        lat: 0,
        lon: 0
    }

}



export const signalSlice = createSlice({
    name: 'signal',
    initialState,
    reducers: {
        //in MenuSlice: onClick dispatches an action to set the signalId
        setSignal: (state: any, action) => {

        },
        //where is geolocation triggered? in Timeout function? Timer dispatches geolocation to store?
    }


})


export const { setSignal } = signalSlice.actions;
export default signalSlice.reducer;