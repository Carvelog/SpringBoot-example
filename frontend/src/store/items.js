import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/ItemService";

const initialState = {
    items:[]
}

const itemsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        add(state, action) {
            state.items = action.payload
        },
        remove(state, action) {
            state.items = []
        }
    }
})

export const itemsActions = itemsSlice.actions
export default itemsSlice.reducer

export const fetchItems = () => {
	return async (dispatch) => {
		const items = await itemService.getItems()
		dispatch(itemsActions.add(items));
	}
}