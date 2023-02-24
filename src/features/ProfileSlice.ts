import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../app/model";

const init: Profile = {
  id: null,
  firstname: "",
  lastname: "",
  contact: null,
  altcontact: null,
  occupation: "",
  dob: null,
  uid: "",
  email: "",
  username: "",
  addressline1: "",
  addressline2: "",
  city: "",
  state_province: "",
  postalcode: "",
  country: "",
  createdon: null,
};
export const profileSlice = createSlice({
  name: "profile",
    initialState: {
        userProfile: init,
    } ,

    reducers: {
        addProfile: (state, action) => {
            state.userProfile = { ...state.userProfile,...action.payload ,createdon : new Date()};
      },
    saveProfile: {
      reducer: (state, action) => {
        state.userProfile = { ...action.payload };
      },

      prepare(data: Profile): any {
        // const firstname = data.firstname;
        // const lastname = data.lastname;
        // const contact = data.contact;
        // const altcontact = data.altcontact;
        // const occupation = data.occupation;
        // const dob = data.dob;
        // const uid = data.uid;
        // const email = data.email;
        // const userName = data.firstname + data.lastname;
        // const addressline1 = data.addressline1;
        // const addressline2 = data.addressline2;
        // const city = data.city;
        // const state_province = data.state_province;
        // const country = data.country;
          const createdon = new Date().toDateString();
          console.log(
            // firstname,
            // lastname,
            // contact,
            // altcontact,
            // occupation,
            // dob,
            // uid,
            // email,
            // userName,
            // addressline1,
            // addressline2,
            // city,
            // state_province,
            // country,
            createdon,
          )

        return {
          payload: {
            // firstname,
            // lastname,
            // contact,
            // altcontact,
            // occupation,
            // dob,
            // uid,
            // email,
            // userName,
            // addressline1,
            // addressline2,
            // city,
            // state_province,
            // country,
            createdon,
          },
        };
      },
    },
      updateProfile: (state, action) => {
        
    },
    ClearProfile: (state, action) => {
        state.userProfile= { ...init };
  }
    },
});

export const {saveProfile,updateProfile,addProfile}= profileSlice.actions
export const selectProfile = (state: any) => state.profile.userProfile
export default profileSlice.reducer