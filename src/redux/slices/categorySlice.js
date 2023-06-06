import {createSlice} from '@reduxjs/toolkit'
const initialState={
categories:[],

}

const categorySlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
    fetchCategories(state,action){
        state.categories=action.payload;
    },
    addCatories(state,action){
state.categories.push(action.payload)
    },
    deleteCategory(state,action){
        state.categories=state.categories.filter(c=>c._id !== action.payload)
    }
    },
})
const categoryReducer=categorySlice.reducer
const categoryAction=categorySlice.actions
export {categoryReducer,categoryAction}