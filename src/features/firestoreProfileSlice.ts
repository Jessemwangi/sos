import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { collection, getDocs, updateDoc, doc, getDoc } from "@firebase/firestore";


const initialState = {
    profileData: {
        id: "",
        firstname: "",
        lastname: "",
        contact: "",
        uid: "",
        email: "",
        username: "",
        city: "",
        country: ""
    },
}


const uid: string = 'adPz97i9O6N4WOxE467OFMhKwgC3'; //anna's uuid for testing
const id = uid;

export const firestoreProfileApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Profile'],
    reducerPath: "firestoreProfileApi",
    endpoints: (builder) => ({
        fetchProfile: builder.query<Profile, void>({
            async queryFn() {
            let profile: Profile = {
                    id: "",
                    firstname: "",
                    lastname: "",
                    contact: "",
                    uid: uid,
                    email: "",
                    username: "",
                    city: "",
                    country: ""
                }; 
                try {
                    const docRef = doc(db, 'profile', id);
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
export const { useFetchProfileQuery, useSetProfileMutation } = firestoreProfileApi;


export const firestoreProfileSlice = createSlice({ //use to send firebase data to store
    name: "fireStoreProfileData",
    initialState,
    reducers: {
        setRecipientData: (state: any, action: PayloadAction<Profile>) => { state.ProfileData = action.payload }

    }
});


export const { setRecipientData } = firestoreProfileSlice.actions;

export default firestoreProfileSlice.reducer;

