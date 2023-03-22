import { Recipient, Profile } from '../model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../../DataLayer/FirestoreInit";
import {   onSnapshot, where, query, getDoc, collection, getDocs, doc, addDoc, updateDoc, QuerySnapshot, DocumentData, setDoc} from "@firebase/firestore";
import {useSelector} from 'react-redux';

//TOO: documents specific to current logged-in user only

type Recipients = Recipient[];

const id:string = 'jbGnTqBog1n4WgvjxRKV';//for testing

//const id:string = useSelector((state:any)=>state.user.user.uid);
//console.log('user id from store', id);

export const firestoreApi = createApi({
 
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients', 'Profile'],
    reducerPath: "firestoreApi",
    endpoints: (builder) => ({
        fetchRecipients: builder.query<Recipients, void>({
            async queryFn() {
                try {
                    const q = query(
                        collection(db, 'recipients'),
                        where('userId', "==", id)
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
        fetchProfile: builder.query<Profile, void>({
            async queryFn() {
            let profile: Profile = {
                    id: "",
                    firstname: "",
                    lastname: "",
                    phone: "",
                    uid: "",
                    email: "",
                    username: "",
                    city: "",
                    country: ""
                }; 
                try {
                    const docRef = doc(db, 'profile', 'jbGnTqBog1n4WgvjxRKV');//TOFIX remove hardcoded id
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





