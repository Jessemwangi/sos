import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";
import { SignalsList } from '../app/model';

//for maintaining the user's personalised emergency types/signals

const init: SignalsList = {
    signalId: "",
    uid: "",
    name: "",
    recipients: [],
    presetMsg: "",
    cstTextId: "",
    createdAt: new Date()
}

type Signals = SignalsList[];


export const sosMenuSlice = createSlice({
    name: 'sosMenu',
    initialState: {
        signals: init,
    },
    reducers: {
        selectSos: (state, action: PayloadAction<number>) => {

        }
    }


})

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
                        where('uid', '==', id),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let signals: Signals = [];
                    querySnapshot?.forEach((doc) => {
                        signals.push({ ...doc.data() } as SignalsList)
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





export const { selectSos } = sosMenuSlice.actions;
export default sosMenuSlice.reducer;


export const { useFetchSignalsListByIdQuery } = sosSignalApi;