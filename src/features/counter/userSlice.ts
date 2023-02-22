import { createSlice } from "@reduxjs/toolkit";
import { Guser } from "../../app/model";

const initialState:Guser = {
    name: '',
    email: '',
    picture: '',
    iat: 0,
    iss: ''
} 

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

        
        SignIn: (state, action) => {
            
        },
        SignOut: (state, action) => {
            
        },
        // RegisterUser: {
        //     reducer: (state, action) => {
              
        //     },
        //     prepare(text) {
        //       const id = nanoid();
        //       const active = true;
        //       const dateCreated = new Date().toDateString();
        //       const admin = false;
      
        //       return { payload: { name, id, active, dateCreated, admin } };
        //     },
        // },
    }
   
});
export const { SignIn, SignOut } = userSlice.actions;
export const selectSosUser = (state: any) => state.userSlice.initialState
export default userSlice.reducer