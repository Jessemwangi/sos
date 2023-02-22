import { createSlice } from "@reduxjs/toolkit";
import { Guser } from "../../app/model";

const initialState:Guser = {
    name: '',
    email: '',
    picture: '',
    iat: 0,
    iss: '',
    jti:''
} 

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

        
        SignIn: (state, action) => {
            console.log(action.payload)
            state = action.payload;
            
        },
        SignOut: (state, ) => {
            state = initialState;
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