import { createSlice } from "@reduxjs/toolkit";
import { LoadingState, Profile } from "../app/model";


const initialLoadingState: LoadingState = true
const errorState:any = ""

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
  createdAt:null
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
      const data = (action.payload); //pull uid from store instead of auth user object to avoid uid load errors
    
   
       if(data) {
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
    //   else { throw new Error("not loaded") }

    //},
    /*     createProfile: (state, action) => {
          state.userProfile = { ...state.userProfile, ...action.payload }; //?
          CreateDocSetId('profile', state.userProfile.uid, { ...state.userProfile })
          state.loadingState = false;
        },
        clearProfile: (state, action) => {
          state.userProfile = { ...init };
        }, */
    /*  saveProfile: (state, action) => {
       state.userProfile = { ...action.payload, id: sosUser.uid };
     } */
    updateProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload }

    },
  }
}

  //    prepare(data: Profile): any {
  // const firstname = data.firstname;
  // const lastname = data.lastname;
  // const phone = data.phone;
  // const altphone = data.altphone;
  // const occupation = data.occupation;
  // const dob = data.dob;
  // const uid = data.uid;
  // const email = data.email;
  // const username = data.firstname + data.lastname;
  // const addressline1 = data.addressline1;
  // const addressline2 = data.addressline2;
  // const city = data.city;
  // const state_province = data.state_province;
  // const country = data.country;
  //const postcode = data.postcode;
 //const createdAt = new Date().toDateString();

 /* 
      return {
      payload: { */
  // firstname,
  // lastname,
  // phone,
  // altphone,
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
  // 
  /*     createdAt,
    },
  };
},
},}*/,


);

//export const { saveProfile, updateProfile, addProfile } = profileSlice.actions
export const { updateProfile,setProfile } = profileSlice.actions
//export const selectProfile = (state: any) => state.profile.userProfile


export default profileSlice.reducer