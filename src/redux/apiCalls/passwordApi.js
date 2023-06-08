import request from "../../utils/request";
import { passwordAction } from "../slices/passwordSlice";
import { toast } from 'react-toastify'

//forgotPassword
export const forgotPasswordFun = (email) => {
    return async () => {
        try {
            const { data } = await request.post('/password/reset-password-link', {email})
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
//get resetPassword
export const getResetPassword = (userId,token) => {
    return async (dispatch) => {
        try {
            await request.get(`/password/reset-password/${userId}/${token}`)
        } catch (error) {
            dispatch(passwordAction.setError())
        }
    }
}
// resetPassword
export const resetPassword = (newPassword,user) => {
    return async () => {
        try {
            const {data}=await request.post(`/password/reset-password/${user.userId}/${user.token}`,
            {
                password:newPassword
            })
            toast.success(data.message)

        } catch (error) {
            toast.error(error.response.data.message)

        }
    }
}