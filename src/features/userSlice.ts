import { createSlice } from "@reduxjs/toolkit";
import { Guser } from "../app/model";
import { useDispatch } from "react-redux";


const init: Guser = {
  name: "",
  email: "",
  picture: "",
  iat: 0,
  iss: "",
  jti: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: init,
  },
  reducers: {
    SignIn: (state, action) => {
      state.users.email = action.payload.email;
      state.users.name = action.payload.name;
      state.users.picture = action.payload.picture;
      state.users.iat = action.payload.iat;
      state.users.jti = action.payload.jti;
      state.users.iss = action.payload.iss;
    },
     GetUserPRofile: (state)=>{
       const dispatch = useDispatch();
      //  dispatch(GetProfile())
       
    },
    SignOut: (state) => {
     
      state.users = { ...init };
    },
  },
});
export const { SignIn, SignOut } = userSlice.actions;
export const selectSosUser = (state: any) => state.userSlice.users;
export default userSlice.reducer;
