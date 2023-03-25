import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState, Profile, SosUser } from "../app/model";
import { GetAllDocs, CreateDocSetId } from "../app/services/DbFunctions";


const initialLoadingState: LoadingState = true

const init: Profile = {
  /*  id: '', */
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
  createdAt: null,
};


export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userProfile: init,
    loadingState: initialLoadingState,
  },

  reducers: {
    getProfile: (state) => {
      const { response, error, loadingState } = GetAllDocs('profile');

      if (response) {
        const profile: Profile = {
          /*    id: response.id, */
          firstname: response.firstname,
          lastname: response.lastname,
          phone: response.phone,
          altphone: response.altphone,
          occupation: response.occupation,
          dob: response.dob,
          uid: response.uid,
          email: response.email,
          username: response.username,
          addressline1: response.addressline1,
          addressline2: response.addressline2,
          city: response.city,
          state_province: response.state_province,
          postcode: response.postcode,
          country: response.country,
          createdAt: response.createdAt
        }
        state.userProfile = { ...profile };
        state.loadingState = loadingState;

      }

      else { throw new Error("not loaded") }

    },
    createProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload }; //?
      CreateDocSetId('profile', state.userProfile.uid, { ...state.userProfile })
      state.loadingState = false;
    },
    clearProfile: (state, action) => {
      state.userProfile = { ...init };
    },
    /*  saveProfile: (state, action) => {
       state.userProfile = { ...action.payload, id: sosUser.uid };
     } */
  }
}

  //    prepare(data: Profile): any {
  // const firstname = data.firstname;
  // const lastname = data.lastname;
  // const contact = data.contact;
  // const altcontact = data.altcontact;
  // const occupation = data.occupation;
  // const dob = data.dob;
  // const id = Math.random()
  // const uid = data.uid;
  // const email = data.email;
  // const userName = data.firstname + data.lastname;
  // const addressline1 = data.addressline1;
  // const addressline2 = data.addressline2;
  // const city = data.city;
  // const state_province = data.state_province;
  // const country = data.country;
  /*   const createdAt = new Date().toDateString();

  
      return {
      payload: { */
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
  // id,
  /*     createdAt,
    },
  };
},
},
updateProfile: (state, action) => {

},

}*/);

//export const { saveProfile, updateProfile, addProfile } = profileSlice.actions
//export const selectProfile = (state: any) => state.profile.userProfile


export default profileSlice.reducer