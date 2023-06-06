import {createSlice} from '@reduxjs/toolkit'
const initialState={
profile:null,
isLoading:false,
isPrfoileDeleted:false,
usersCount:null,
profiles:[],
isProfileUpdated:false
}

const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
    getProfile(state,action){
        state.profile=action.payload
    },
    setProfilePhoto(state,action){
        state.profile.profilePhoto=action.payload
    },
    updateUserProfile(state,action){
        state.profile=action.payload;
        state.isProfileUpdated=true
    },
    setLoading(state){
        state.isLoading=true
    },
    clearLoading(state){
        state.isLoading=false
    },
    setProfileDeleted(state){
        state.isLoading=false;
        state.isPrfoileDeleted=true
    },
    clearProfileDeleted(state){
        state.isPrfoileDeleted=false
    },
    setProfiles(state,action){
        state.profiles=action.payload
    },
    setUsersCount(state,action){
        state.usersCount=action.payload
    }
    },

})
const profileReducer=profileSlice.reducer
const profileAction=profileSlice.actions
export {profileReducer,profileAction}