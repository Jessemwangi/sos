import { Recipient, Profile } from '../model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../../DataLayer/FirestoreInit";
import { where, query, getDoc, collection, getDocs, doc, updateDoc, QuerySnapshot, DocumentData, setDoc } from "@firebase/firestore";


type Recipients = Recipient[];

export const firestoreApi = createApi({

    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients', 'Profile'],
    reducerPath: "firestoreApi",

    endpoints: (builder) => ({

        fetchRecipientsById: builder.query<Recipients, { id: string }>({
            async queryFn(arg) {
                const { id } = arg;
                try {
                    const q = query(
                        collection(db, 'recipients'),
                        where('userId', '==', id),
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let recipients: Recipients = [];
                    querySnapshot?.forEach((doc) => {
                        recipients.push({ id: doc.id, ...doc.data() } as Recipient)
                    });
                    return { data: recipients };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Recipients'],
        }),

        fetchRecipients: builder.query<Recipients, { para1: string | undefined }>({
            async queryFn(arg) {
                const { para1 } = arg;
                // console.log('arg', arg)

                try {
                    const q = query(
                        collection(db, 'recipients'),
                        where('userId', "==", para1)
                    );
                    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
                    let recipients: Recipients = [];
                    querySnapshot?.forEach((doc) => {
                        recipients.push({ id: doc.id, ...doc.data() } as Recipient)
                    },
                    );
                    return { data: recipients }
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            providesTags: ['Recipients'],
        }),

        setRecipient: builder.mutation({
            async queryFn({ recipientId, details }) {
                try {
                    await updateDoc(doc(db, 'recipients', recipientId), {
                        details
                    });
                    return { data: null };
                }
                catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ['Recipients'],
        }),
        ///////////     fetch profile    /////////////

        //parameter id: {id:string;}
        fetchProfile: builder.query<Profile, string>({
            async queryFn(arg) {
                //const profile: Profile = { uid: arg };

                try {
                    const docSnap = await getDoc(doc(db, 'profile', arg));
                    let profile: Profile = {}

                    if (docSnap.exists()) {
                        profile = { ...profile, ...docSnap.data() }
                        return { data: profile }
                    }
                    else {
                        profile = {}
                        return { data: profile }
                    }
                }
                catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Profile'],

        }),

        setProfile: builder.mutation({
            async queryFn({ id, details }) {
                try {
                    await setDoc(doc(db, 'profile', id), {
                        details
                    }, { merge: true });
                    return { data: null };
                }
                catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ['Profile'],
        })

    })
});


export const { useFetchRecipientsByIdQuery, useFetchRecipientsQuery, useSetRecipientMutation, useFetchProfileQuery, useSetProfileMutation } = firestoreApi;
