import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    roles: [],
    authCookie: ""
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state) {
            state.isAuthenticated = true
        },
        signout(state) {
            state.isAuthenticated = false
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer