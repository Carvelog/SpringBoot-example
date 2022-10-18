import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/ItemService";

const initialState = {
    items:[]
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        add(state, action) {
            state.items = action.payload
        },
        addItem(state, action){
            state.items.push(action.payload)
        },
        update(state, action){
            const itemID = state.items.map((e) => e.id).indexOf(action.payload.id)
            state.items[itemID] = action.payload
        },
        deleteItem(state, action) {
            const items = state.items.filter((item) => item.id != action.payload)
            state.items = items
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