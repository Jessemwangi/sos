import { createSlice } from "@reduxjs/toolkit";
import { Guser } from "../app/model";

//Saves data for signed in Google user

const init: Guser = {
  name: "",
  email: "",
  picture: "",
  iat: 0,
  iss: "",
  jti: "",
  sub: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: init,
  },
  reducers: {
    signIn: (state, action) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.picture = action.payload.picture;
      state.user.iat = action.payload.iat;
      state.user.jti = action.payload.jti;
      state.user.iss = action.payload.iss;
      state.user.sub = action.payload.sub;
    },

    signOut: (state) => {
      state.user = { ...init };
    },
  },
});
export const { signIn, signOut } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default userSlice.reducer;
