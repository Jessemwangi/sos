import { customText } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { where, query, getDoc, collection, getDocs, doc, updateDoc, QuerySnapshot, DocumentData, setDoc } from "@firebase/firestore";


/* 
export interface customText {
    cstTextId: number
    message: string
    title: string
    userId: string
} */


type Messages = customText[];

export const customTextApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Messages'],
    reducerPath: "customTextApi",

    endpoints: (builder) => ({
        fetchMessagesById: builder.query<Messages, { id: string }>({
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
                        messages.push({ ...doc.data() } as customText)
                    });
                    return { data: messages };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Messages'],
        }),
        setMessage: builder.mutation({
            async queryFn({ id, details }) {
                try {
                    await setDoc(doc(db, 'customTexts', id), {
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
