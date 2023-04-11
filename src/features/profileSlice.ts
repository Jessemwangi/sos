import { createSlice } from "@reduxjs/toolkit";
import { LoadingState, Profile } from "../app/model";


const initialLoadingState: LoadingState = true;
const errorState: any = "";

const init: Profile = {
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
  createdAt: null
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: init,
    loadingState: initialLoadingState,
    errorState
  },

  reducers: {
    setProfile: (state, action) => {
      const data = (action.payload);

      if (data) {
        const profile: Profile = {

          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          altphone: data.altphone,
          occupation: data.occupation,
          dob: data.dob,
          uid: data.uid,
          email: data.email,
          username: data.username,
          addressline1: data.addressline1,
          addressline2: data.addressline2,
          city: data.city,
          state_province: data.state_province,
          postcode: data.postcode,
          country: data.country,
        }

        state.userProfile = { ...profile };
      }
    },

    updateProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload }

    },
  }
}
);



export const { updateProfile, setProfile } = profileSlice.actions



export default profileSlice.reducer