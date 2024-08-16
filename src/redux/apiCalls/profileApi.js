import request from "../../utils/request";
import { profileAction } from "../slices/profileSlice";
import { authAction } from "../slices/authSlice";
import { toast } from 'react-toastify'

//get user
export const getProfile = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/users/profile/${userId}`)
            dispatch(profileAction.getProfile(data))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
//upload Photo
export const uploadPhotoProfile = (newPhoto) => {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.post(`/users/profile/upload-photo`,
            newPhoto,
            {
            headers:{
                Authorization:"Bearer " + getState().auth.user.token,
                "Content-Type":"multipart/form-data"
            
            }}
            )
            dispatch(profileAction.setProfilePhoto(data?.profilePhoto))
            dispatch(authAction.setNewPhoto(data?.profilePhoto))
            toast.success(data?.message)
            //modify data in local storage
            const user=JSON.parse(localStorage.getItem('userInfo'))
            user.profilePhoto=data?.profilePhoto
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
//upload Photo
export const updateUserProfile = (userId,profile) => {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.put(`/users/profile/${userId}`,
            profile,
            {
            headers:{
                Authorization:"Bearer " + getState().auth.user.token,            
            }}
            )
            dispatch(profileAction.updateUserProfile(data))
            dispatch(authAction.setUsername(data?.username))
            //modify data in local storage
            const user=JSON.parse(localStorage.getItem('userInfo'))
            user.username=data?.username
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}

//delete profile account
//users/profile/6475042e8b586bf92f050aa5
export const deleteProfile = (userId) => {
    return async (dispatch,getState) => {
        dispatch(profileAction.setLoading())
        try {
            const { data } = await request.delete(`/users/profile/${userId}`,  {
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,            
                }})
            dispatch(profileAction.setProfileDeleted())
            toast.success(data?.message)
            setTimeout(()=>dispatch(profileAction.clearProfileDeleted()),2000)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        dispatch(profileAction.clearLoading())
        }
    }
}
//get all profiles users/profile
export const getAllUsers = () => {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.get(`/users/profile`,  {
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,            
                }})
            dispatch(profileAction.setProfiles(data))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
///profile/count
export const getUserCount = () => {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.get(`/users/profile/count`,  {
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,            
                }})
            dispatch(profileAction.setUsersCount(data))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}