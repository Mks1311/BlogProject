import { createSlice } from "@reduxjs/toolkit";

const AuthSlice=createSlice({
    name:"Auth",
    initialState:{
        status:false,
        userData:null,
    },
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        }, 
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
})

export default AuthSlice.reducer;

export const {login,logout} = AuthSlice.actions;