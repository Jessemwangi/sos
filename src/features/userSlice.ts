import { createSlice } from "@reduxjs/toolkit";
import { Profile, SosUser } from "../app/model";

const userInit: SosUser = {
  name: "",
  email: "",
  uid: ""
}

export const userSlice = createSlice({
  name: "userStore",
  initialState: {
    sosUser: userInit,
    loggedIn: false
  },

  reducers: {
    setSosUser: (state, action) => {
      state.sosUser.email = action.payload.email;
      state.sosUser.uid = action.payload.uid;
      state.sosUser.name = action.payload.name;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    }
  },
});
export const { setSosUser, setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
