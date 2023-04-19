import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignalsList } from '../app/model';

import { db } from "../dataLayer/FirestoreInit";
import { where, query, collection, getDocs, QuerySnapshot, DocumentData, /* orderBy */ } from "@firebase/firestore";

type UserSignals = SignalsList[]

export const signalsListApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['UserSignals'],
    reducerPath: "signalsListApi",

    endpoints: (builder) => ({
        fetchUserSignalsById: builder.query<UserSignals, { id: string | undefined }>({
            async queryFn(arg) {
                const { id } = arg;
                try {
                    const q = query(
                        collection(db, 'signalsList'),
                        where('uid', 'in', [id, 'ALL']),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let userSignals: UserSignals = [];
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



export const { useFetchUserSignalsByIdQuery } = signalsListApi;