import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getDoc, doc } from "@firebase/firestore";
import { db } from "../DataLayer/FirestoreInit";
import { Profile } from "../app/model";


export const profileApi = createApi({
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Profile'],
    reducerPath: "profileApi",

    endpoints: (builder) => ({
        fetchProfile: builder.query<Profile, string>({
            async queryFn(arg) {
                let profile: Profile = {} as Profile;
                try {
                    const docSnap = await getDoc(doc(db, 'profile', arg));
                    profile = { ...profile, ...docSnap.data() }
                    return { data: profile }
                }
                catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Profile'],

        }),





        /*
          fetchProfile: builder.query<Profile, string | undefined>({
            async queryFn(arg) {
              let profile: Profile = {
                firstname: "",
                lastname: "",
                phone: "",
                altphone: "",
                occupation: "",
                dob: null,
                uid: "",
                email: "",
                username: "",
                addressline1: "",
                addressline2: "",
                city: "",
                state_province: "",
                postcode: "",
                country: "",
                createdAt: ""
              
              } 
      
           */

    })
})

export const { useFetchProfileQuery } = profileApi;