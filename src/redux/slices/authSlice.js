import {createSlice} from '@reduxjs/toolkit'
const initialState={
user:localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):null,
registerMessage:null,
isVerifiedEmail:false
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
    login(state,action){
        state.user=action.payload
        state.registerMessage=null
    },
    logoutUser(state){
        state.user=null
    },
    rgisterUser(state,action){
        state.registerMessage=action.payload
    },
    setNewPhoto(state,action){
        state.user.profilePhoto=action.payload
    },
    setUsername(state,action){
        state.user.username=action.payload
    },
    setVerifiedEmail(state){
        state.isVerifiedEmail=true;
        state.registerMessage=null
    }
    },
})
const authReducer=authSlice.reducer
const authAction=authSlice.actions
export {authAction,authReducer}