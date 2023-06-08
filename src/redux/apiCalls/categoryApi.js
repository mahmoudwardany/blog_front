import request from "../../utils/request";
import { toast } from 'react-toastify'
import { categoryAction } from "../slices/categorySlice";


//fetch categories
export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/categories`)
            toast.success(data?.message)
            dispatch(categoryAction.fetchCategories(data?.categories))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
//add Category
export const addNewCategory = (newCategory) => {
    return async (dispatch,getstate) => {
        try {
            const { data } = await request.post(`/categories`,newCategory,{
                headers:{
                    Authorization:"Bearer " + getstate().auth.user.token
                }
            })
            toast.success(data?.message)
            dispatch(categoryAction.addCatories(data))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
export const deleteCategory = (categoryId) => {
    return async (dispatch,getstate) => {
        try {
            const { data } = await request.delete(`/categories/${categoryId}`,{
                headers:{
                    Authorization:"Bearer " + getstate().auth.user.token
                }
            })
            toast.success(data?.message)
            dispatch(categoryAction.deleteCategory(data?.categoryId))
        } catch (error) {
            toast.error(error.response.data?.message)
        }
    }
}