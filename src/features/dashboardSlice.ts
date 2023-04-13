import { createSlice } from "@reduxjs/toolkit";
import { SignalsList } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";

export interface DashboardState {
    activeSos: boolean;
    signal: SignalsList;
}

const init: SignalsList = {
    id: "",
    uid: "",
    name: "",
    recipients: [],
    presetMsg: "",
    cstTextId: "",
    createdAt: "",
    pinned: false,
    default: false
}

//type Signals = SignalsList[] | undefined;


const initialState: DashboardState = {
    activeSos: false,
    signal: init,
};


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        activate: (state, action) => { state.activeSos = action.payload }
    },
    /*  selectSos: (state, action: PayloadAction<SignalsList>) => {
         state.signal = {state.signal, ...action.payload}
     } */
}
);

export const sosSignalApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Signals'],
    reducerPath: "sosSignalApi",

    endpoints: (builder) => ({
        fetchSignalsListById: builder.query<SignalsList[], { id: string }>({
            async queryFn(arg) {
                const { id } = arg;
                try {
                    const q = query(
                        collection(db, 'signalsList'),
                        where('uid', 'in', [id, 'ALL']),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let signals: SignalsList[] = [];
                    querySnapshot?.forEach((doc) => {
                        signals!.push({ ...doc.data() } as SignalsList)
                    })
                    return { data: signals };
                }
                catch (error: any) {
                    return { error: error.message };
                }
            },

        }),
    })

})


export const { useFetchSignalsListByIdQuery } = sosSignalApi;

export const { activate } = dashboardSlice.actions;
export default dashboardSlice.reducer;