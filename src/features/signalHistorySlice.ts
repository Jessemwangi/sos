import { createSlice } from "@reduxjs/toolkit";
import { Signal } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../dataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";

//used to fetch dispatched signal history from db


const init: Signal = {
    id: "",
    uid: "",
    createdAt: "",
    geolocation: {
        lat: 0,
        lng: 0
    },
    signalType: ""
}

type SignalHistory = Signal[];

export const signalHistorySlice = createSlice({
    name: 'signal',
    initialState: {
        signal: init,
        signalId: ""
    },
    reducers: {


    },
})

export const signalHistoryApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['SignalHistory'],
    reducerPath: "SignalHistoryApi",

    endpoints: (builder) => ({
        fetchSignalsById: builder.query<SignalHistory, { id: string | undefined }>({
            async queryFn(id) {
                try {
                    const q = query(
                        collection(db, 'signals'),
                        where('uid', '==', id),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let signalHistory: SignalHistory = [];
                    querySnapshot?.forEach((doc) => {
                        signalHistory!.push({ ...doc.data() } as Signal)
                    })
                    return { data: signalHistory };
                }
                catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['SignalHistory'],
        }),
    })
})


export const { useFetchSignalsByIdQuery } = signalHistoryApi;

//export const { } = signalHistorySlice.actions;
export default signalHistorySlice.reducer;