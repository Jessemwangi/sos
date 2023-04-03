import { Recipient, Profile } from '../model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../../DataLayer/FirestoreInit";
import { onSnapshot, where, query, getDoc, collection, getDocs, doc, addDoc, updateDoc, QuerySnapshot, DocumentData, setDoc } from "@firebase/firestore";


type Recipients = Recipient[];

export const firestoreApi = createApi({

    baseQuery: fakeBaseQuery(),
    tagTypes: ['Recipients', 'Profile'],
    reducerPath: "firestoreApi",

    endpoints: (builder) => ({
        fetchRecipients: builder.query<Recipients, { para1: string | undefined }>({
            async queryFn(arg) {
                const { para1 } = arg;
                console.log('arg', arg)

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
                        console.log("Document data:", docSnap.data());
                        profile = { ...profile, ...docSnap.data() }
                        console.log(profile);
                        return { data: profile }
                    }
                    else {
                        profile={}
                        return { data: profile }
                    }
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


export const { useFetchRecipientsQuery, useSetRecipientMutation, useFetchProfileQuery, useSetProfileMutation } = firestoreApi;



/* No overload matches this call. //db, collection, docId ....array of strings?
  Overload 1 of 3, '(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference<DocumentData>', gave the following error.
    Argument of type '{ id: string; }' is not assignable to parameter of type 'string'.

  Overload 2 of 3, '(reference: CollectionReference<unknown>, path?: string | undefined, ...pathSegments: string[]): DocumentReference<unknown>', gave the following error.
    Argument of type 'Firestore' is not assignable to parameter of type 'CollectionReference<unknown>'.

      Type 'Firestore' is missing the following properties from type 'CollectionReference<unknown>': id, path, parent, withConverter, and 2 more.

  Overload 3 of 3, '(reference: DocumentReference<unknown>, path: string, ...pathSegments: string[]): DocumentReference<DocumentData>', gave the following error.
    Argument of type 'Firestore' is not assignable to parameter of type 'DocumentReference<unknown>'.
      Type 'Firestore' is missing the following properties from type 'DocumentReference<unknown>': converter, firestore, id, path, and 2 more.ts(2769)
 */