import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isError: false,

}

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {
        setError(state) {
            state.isError = true
        },
    },
})
const passwordReducer = passwordSlice.reducer
const passwordAction = passwordSlice.actions
export { passwordReducer, passwordAction }