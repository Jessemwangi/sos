import { Recipient, Profile } from '../model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../../DataLayer/FirestoreInit";
import { collection, getDocs, updateDoc, doc, getDoc } from "@firebase/firestore";

////TOO: documents specific to current logged-in user only


type Recipients = Recipient[];


//const uid: string = 'adPz97i9O6N4WOxE467OFMhKwgC3'; //anna's uuid for testing
const id:string = 'jbGnTqBog1n4WgvjxRKV';

export const firestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients', 'Profile'],
    reducerPath: "firestoreApi",
    endpoints: (builder) => ({
        fetchRecipients: builder.query<Recipients, void>({
            async queryFn() {
                try {
                    const ref = collection(db, 'recipients');
                    const querySnapshot = await getDocs(ref);
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
        fetchProfile: builder.query<Profile, void>({
            async queryFn() {
            let profile: Profile = {
                    id: "",
                    firstname: "",
                    lastname: "",
                    contact: "",
                    uid: "",
                    email: "",
                    username: "",
                    city: "",
                    country: ""
                }; 
                try {
                    const docRef = doc(db, 'profile', 'jbGnTqBog1n4WgvjxRKV');
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        profile ={...profile, ...docSnap.data()}

                    }
                     return { data: profile }
                }
                catch (error: any) {
                    console.log("No such document");
                    return { error: error.message };
                }
            },
            providesTags: ['Profile'],

        }),

        setProfile: builder.mutation({
            async queryFn({ id, details }) {
                try {
                    await updateDoc(doc(db, 'profile', id), {
                        details
                    });
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
export const { useFetchRecipientsQuery, useSetRecipientMutation, useFetchProfileQuery, useSetProfileMutation  } = firestoreApi;





