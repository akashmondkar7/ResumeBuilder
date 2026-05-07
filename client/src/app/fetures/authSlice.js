import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        token:null,
        user:null,
        loading:true
    },
   reducers:{
    login: (state,action) =>{
        state.token =

    }
    
   }
})