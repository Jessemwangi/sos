import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CustomText } from '../app/model';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, collection, getDocs, doc, QuerySnapshot, DocumentData, setDoc } from "@firebase/firestore";


type Messages = CustomText[];

const init: CustomText = {
    cstTextId: "",//uuid generated id
    message: "",
    title: "",
    userId: ""
}

export const customTextSlice = createSlice({
    name: 'customText',
    initialState: {
        customText: init,
        reload: false
    },
    reducers: {
        setText: (state: any, action: PayloadAction<object>) => { state.customText = { ...state.customText, ...action.payload } },
        clearText: (state) => { state.customText = init },
        triggerReload: (state) => { state.reload = !state.reload }

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
                        where('userId', '==', id),
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
        setMessage: builder.mutation({
            async queryFn({ docId, details }) {
                try {
                    await setDoc(doc(db, 'customTexts', docId), {
                        details
                    }, { merge: true });
                    return { data: null };
                }
                catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ['Messages'],
        }),



    })
});


export const { useFetchMessagesByIdQuery, useSetMessageMutation } = customTextApi;


export const { setText, clearText, triggerReload } = customTextSlice.actions;
export default customTextSlice.reducer;