import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    roles: []
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
            state.roles = []
        },
        setRoles(state, action){
            state.roles = action.payload
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer