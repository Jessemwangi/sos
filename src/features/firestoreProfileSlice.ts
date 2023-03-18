import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from '../app/model';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from "../DataLayer/FirestoreInit";
import { collection, getDocs, updateDoc, doc, getDoc } from "@firebase/firestore";

////TOO: documents specific to current logged-in user only

const initialState = {

    profileData: {},

}



const uid: string = 'adPz97i9O6N4WOxE467OFMhKwgC3'; //anna's uuid for testing



export const firestoreApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Profile'],
    reducerPath: "firestoreApi",
    endpoints: (builder) => ({
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
                    country: "",
                    createdAt: new Date()
                };
                try {
                    const docRef = doc(db, 'profile', uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        profile = { ...docSnap.data() };
                        return { data: profile }
                    }
                }
                catch (error: any) {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    return { error: error.message };
                }
            },
            providesTags: ['Profile'],

        }),
        /////////////
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
export const { useFetchProfileQuery, useSetProfileMutation } = firestoreApi;



export const firestoreProfileSlice = createSlice({
    name: "fireStoreProfileData",
    initialState,
    reducers: {
        setRecipientData: (state: any, action: PayloadAction<Profile>) => { state.recipientData = action.payload }

    }
});


export const { setRecipientData } = firestoreProfileSlice.actions;

export default firestoreProfileSlice.reducer;

