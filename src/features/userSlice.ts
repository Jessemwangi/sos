import { createSlice } from "@reduxjs/toolkit";
import { EncryptGuser } from "../app/model";
import { useDispatch } from "react-redux";


const init: EncryptGuser = {
  encryptedUserData: sessionStorage.getItem('encryptedUserData') ? sessionStorage.getItem('encryptedUserData') : '',

};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: init,
  },
  reducers: {
    SignIn: (state, action) => {

      state.users.encryptedUserData = action.payload.encryptedUserData;
    },
     GetUserPRofile: (state)=>{
       const dispatch = useDispatch();
        // dispatch(GetProfile())
       
    },
    SignOut: (state) => {
      state.users = {...init};
    },
  },
});
export const { SignIn, SignOut } = userSlice.actions;
export const selectSosUser = (state: any) => state.userSlice.users;
export default userSlice.reducer;
