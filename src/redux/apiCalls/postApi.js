import request from "../../utils/request";
import { toast } from 'react-toastify'
import { postAction } from "../slices/postSlice";
//fetch posts
export const getPosts = (pageNum) => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/posts?pageNumber=${pageNum}`)
            toast.success(data.message)
            dispatch(postAction.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const fetchAllPosts = () => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/posts`)
            toast.success(data.message)
            dispatch(postAction.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
//fetch posts count to make pagination
export const getpostCount = () => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/posts/count`)
            dispatch(postAction.setCount(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const getPostsByCategory = (category) => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/posts?category=${category}`)
            dispatch(postAction.setPostCat(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const createPost = (newPost) => {
    return async (dispatch,getState) => {
        try {
            dispatch(postAction.setLoading())
            await request.post(`/posts`,newPost,{
                headers:{
                Authorization:"Bearer " + getState().auth.user.token,
                "Content-Type":"multipart/form-data"
                }
            })
            dispatch(postAction.setPostCreate())
            setTimeout(()=>dispatch(postAction.clearPostCreated),2000)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(postAction.clearLoading())
        }
    }
}
//fetch post
export const getPostDetails = (postId) => {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/posts/${postId}`)
            toast.success(data.message)
            dispatch(postAction.setPostDetails(data.post))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
///like/:id
//like post
export function postLikeToggle  (postId)  {
    return async (dispatch,getState) => {
        try {
            const { data } = await request.put(`/posts/like/${postId}`,{},{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            toast.success(data)
            dispatch(postAction.setLike(data))
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
}
//update post Image
export function updatePostImage  (newImage,postId)  {
    return async (dispatch,getState) => {
        try {
            await request.put(`/posts/upload-image/${postId}`,newImage,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    "Content-Type":"multipart/form-data"
                }
            });
            toast.success('New Post Image upload Succefully')
        } catch (error) {
            toast.error(error)
        }
    }
}
//update post 
export function updatePost  (newPost,postId)  {
    return async (dispatch,getState) => {
        try {
            await request.put(`/posts/${postId}`,newPost,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            });
            toast.success('Post Update Successfully')
        } catch (error) {
            toast.error(error)
        }
    }
}
//delete post 
export function deletePost  (postId)  {
    return async (dispatch,getState) => {
        try {
            const {data}=  await request.delete(`/posts/${postId}`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            });
            dispatch(postAction.deletPost(data.postId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error)
        }
    }
}