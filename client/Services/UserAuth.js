import { createSlice } from "@reduxjs/toolkit";

const initialState={
    LoggedIn:false,
    User:null,
}

export const UserAuth = createSlice({
    name:"User",
    initialState,
    reducers:{
        logUser:(state,action)=>{
            state.LoggedIn = action.payload;
        },
        setUser:(state,action)=>{
            state.User=action.payload
        }
    }
})

export const { logUser,setUser } = UserAuth.actions;
export default UserAuth.reducer