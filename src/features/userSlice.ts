import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { Guser, Profile, sosUser } from "../app/model";
import {auth} from '../app/services/firebaseAuth';

//Saves data for signed in Google user

const init: Guser = {
  name: "",
  email: null,
  picture: "",
  iat: 0,
  iss: "",
  jti: "",
  sub: '',
};

const user: sosUser = {
name: "",
email:"",
uid: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    Guser: init,
    user: user
  },
  reducers: {
    signInGuser: (state, action) => {  
      state.Guser.email = action.payload.email;
      state.Guser.name = action.payload.name;
      state.Guser.picture = action.payload.picture;
      state.Guser.iat = action.payload.iat;
      state.Guser.jti = action.payload.jti;
      state.Guser.iss = action.payload.iss;
      state.Guser.sub = action.payload.sub;
    },
    signOutGuser: (state) => {
      state.Guser = { ...init };
    },
  },
});
export const { signInGuser, signOutGuser } = userSlice.actions;
export default userSlice.reducer;
