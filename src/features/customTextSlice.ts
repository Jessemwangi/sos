import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CustomText } from '../app/model';
import { db } from "../dataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData, /* orderBy */ } from "@firebase/firestore";


type Messages = CustomText[];

const init: CustomText = {
    id: "",
    message: "",
    title: "",
    uid: "",
    default: false,
}

export const customTextSlice = createSlice({
    name: 'customText',
    initialState: {
        customText: init,
        popoverState: false,
        deletePopoverOpen: false
    },
    reducers: {
        setCustomText: (state: any, action: PayloadAction<object>) => { state.customText = { ...state.customText, ...action.payload } },
        togglePopover: (state) => { state.popoverState = !state.popoverState },
        resetForm: (state) => { state.customText = init },
        toggleDeletePopover: (state) => { state.deletePopoverOpen = !state.deletePopoverOpen },
    }
});

export const customTextApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Messages'],
    reducerPath: "customTextApi",

    endpoints: (builder) => ({
        fetchMessagesById: builder.query<Messages, { id: string | undefined }>({
            async queryFn(arg) {
                const { id } = arg;
                try {
                    const q = query(
                        collection(db, 'customTexts'),
                        where('uid', 'in', [id, 'ALL']),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let messages: Messages = [];
                    querySnapshot?.forEach((doc) => {
                        messages.push({ ...doc.data() } as CustomText)
                    });
                    return { data: messages };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Messages'],
        }),
    })
});


export const { useFetchMessagesByIdQuery } = customTextApi;


export const { setCustomText, resetForm, togglePopover, toggleDeletePopover } = customTextSlice.actions;
export default customTextSlice.reducer;