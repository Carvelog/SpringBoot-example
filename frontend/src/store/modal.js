import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}

const modalSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        openModal(state) {
            state.isOpen = true
        },
        closeModal(state) {
            state.isOpen = false
        }
    }
})

export const modalActions = modalSlice.actions
export default modalSlice.reducer