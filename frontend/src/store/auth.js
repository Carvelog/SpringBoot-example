import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    roles: [],
    isAdmin: false,
    username: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signin(state, action) {
            state.isAuthenticated = true
            if(action.payload){
                state.roles = action.payload
                action.payload.includes('ADMIN') ? state.isAdmin = true : state.isAdmin = false 
            }
        },
        signout(state) {
            state.isAuthenticated = false
            state.roles = []
            state.isAdmin = false
            state.username = ''
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer