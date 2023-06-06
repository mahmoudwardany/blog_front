import request from "../../utils/request";
import { authAction } from "../slices/authSlice";
import { toast } from 'react-toastify'
export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await request.post('/auth/login', user)
            localStorage.setItem("userInfo", JSON.stringify(data))
            toast.success(data.message)
            dispatch(authAction.login(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const logoutUser = () => {
    return (dispatch) => {
        dispatch(authAction.logoutUser())
        localStorage.removeItem('userInfo')
        toast.success(`Logout Succesfully`)
    }
}
//register
export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            const { data } = await request.post('/auth/register', user)
            dispatch(authAction.rgisterUser(data.message))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const verifyEmail = (userId,token) => {
    return async (dispatch) => {
        try {
            await request.get(`/auth/${userId}/verify/${token}`)
            dispatch(authAction.setVerifiedEmail())
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}