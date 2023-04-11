import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignalsList } from '../app/model';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, collection, getDocs, doc, QuerySnapshot, DocumentData, setDoc } from "@firebase/firestore";
import { FlashAutoRounded } from '@mui/icons-material';


type UserSignals = SignalsList[];
const init: SignalsList = {
    signalId: "",
    uid: "", //firebase uid
    name: "",
    recipients: [""],
    presetMsg: "",
    cstTextId: "",
    createdAt: "",
    pinned: false,
    default: false
}
const userSignals: UserSignals = [];

//modify a signal, delete a signal, add a new signal to signalsList

const manageSignalSlice = createSlice({
    name: 'manageSignals',
    initialState: {
        storeSignalsList: init,
        popoverState: false
    },
    reducers: {
        setStoreSignalsList: (state, action) => {
            state.storeSignalsList = { ...state.storeSignalsList, ...action.payload };
        },
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        resetForm: (state) => {
            state.storeSignalsList = init;
        }
    }
});


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
                        where('uid', '==', id),
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


export const { setStoreSignalsList, resetForm } = manageSignalSlice.actions;
export default manageSignalSlice.reducer
