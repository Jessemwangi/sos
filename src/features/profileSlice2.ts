import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../app/model";

const initialState = {
   profileData : {
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

export const profileSlice2 = createSlice({
    name: "profileData",
    initialState,
    reducers: {
        
setProfileData: (state: any, action: PayloadAction<Profile>) => { state.ProfileData = action.payload }

    }
});


export const { setProfileData } = profileSlice2.actions;

export default profileSlice2.reducer;