import { createSlice } from "@reduxjs/toolkit";
import { LoadingState, Profile } from "../app/model";
import { GetData, PostData } from "../app/functions/DbFunctions";

const init: Profile= {
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

const initialLoadingState: LoadingState =  true


interface ProfileState {
  userProfile: Profile;
  loadingState: LoadingState;
}

interface DataFetchResponse {
  response: Profile | null
  error: string | null
  loading:LoadingState
}
const initialState: ProfileState = {
  userProfile: init,
  loadingState: initialLoadingState,
};

export const profileSlice = createSlice({
  name: "profile",
    initialState: {
      userProfile: initialState.userProfile,
      loadingState: initialState.loadingState,
    } ,

  reducers: {
    GetProfile: (state) => {
     
        const { response, error, loadingState }= GetData('profile')
        try {
          if (response)
          {
            const UserProfile:Profile = {
              id: response.id,
              firstname: response.firstname,
              lastname: response.lastname,
              contact: response.contact,
              altcontact: response.altcontact,
              occupation: response.occupation,
              dob: response.dob,
              uid: response.uid,
              email: response.email,
              username: response.username,
              addressline1: response.addressline1,
              addressline2: response.addressline2,
              city: response.city,
              state_province: response.state_province,
              postalcode: response.postalcode,
              country: response.country,
              createdon: response.createdon
            }
            state.userProfile = { ...UserProfile }
            state.loadingState = loadingState
          }
          else
            throw new Error("not loaded");
            
        } catch (error:any) {
          throw new Error (error.message)
          
        }
        
      
      },
        addProfile: (state, action) => {
          state.userProfile = { ...state.userProfile, ...action.payload, createdon: new Date() };
          PostData('profile', state.userProfile)
          state.loadingState=false
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