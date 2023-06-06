import {createSlice} from '@reduxjs/toolkit'
const initialState={
comments:[],

}

const commentSlice=createSlice({
    name:"comments",
    initialState,
    reducers:{
        setComment(state,action){
            state.comments=action.payload
        },
        deleteComment(state,action){
            state.comments=state.comments.filter(c=>c._id !== action.payload)
        }
    },
})
const commentReducer=commentSlice.reducer
const commentAction=commentSlice.actions
export {commentReducer,commentAction}