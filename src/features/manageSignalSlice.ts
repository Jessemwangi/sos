import { createSlice } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignalsList } from '../app/model';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData } from "@firebase/firestore";

const init: SignalsList = {
    id: "",
    uid: "",
    name: "",
    recipients: [""],
    presetMsg: "",
    cstTextId: "",
    createdAt: "",
    pinned: false,
    default: false
}

//modify a signaltype, delete a signaltype, add a new signal to signalsList

const manageSignalSlice = createSlice({
    name: 'manageSignals',
    initialState: {
        signalsList: init,
        popoverState: false
    },
    reducers: {
        setSignalsList: (state, action) => {
            state.signalsList = { ...state.signalsList, ...action.payload };
        },
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        resetForm: (state) => {
            state.signalsList = init;
        }
    }
});
type UserSignals = SignalsList[];
const userSignals: UserSignals = [];

export const signalsListApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['UserSignals'],
    reducerPath: "signalsListApi",

    endpoints: (builder) => ({
        fetchSignalsListById: builder.query<UserSignals, { id: string | undefined }>({
            async queryFn(arg) {
                const { id } = arg;
                try {
                    const q = query(
                        collection(db, 'signalsList'),
                        where('uid', 'in', [id, 'ALL'])
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    querySnapshot?.forEach((doc) => {
                        userSignals.push({ ...doc.data() } as SignalsList)
                    });
                    return { data: userSignals };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['UserSignals'],
        }),
    })
});

export const { useFetchSignalsListByIdQuery } = signalsListApi;


export const { setSignalsList, resetForm } = manageSignalSlice.actions;
export default manageSignalSlice.reducer
