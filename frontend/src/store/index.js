import { configureStore, ConfigureStore } from "@reduxjs/toolkit";

import authReducer from "./auth"
import modalReducer from './modal'
import itemsReducer from './items'

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        items: itemsReducer
    } 
})

export default store