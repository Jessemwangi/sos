import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { Profile, SosUser } from "../app/model";
import { auth } from '../app/services/FirebaseAuth';

const userInit: SosUser = {
  name: "",
  email: "",
  uid: ""
}

export const userSlice = createSlice({
  name: "userStore",
  initialState: {
    sosUser: userInit
  },
  reducers: {
    setUserStore: (state, action) => {
      state.sosUser.email = action.payload.email;
      state.sosUser.uid = action.payload.uid;
      state.sosUser.name = action.payload.name;

    }
  },
});
export const { setUserStore } = userSlice.actions;
export default userSlice.reducer;
