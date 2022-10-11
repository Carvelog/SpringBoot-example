import { createSlice } from "@reduxjs/toolkit";

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
      const fetchData = async () => {
        const response = await fetch(
          'http://localhost:8080/api/products/products',
            {
                method: 'GET',
                redirect: 'follow',
                cors: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                },
            }
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch items data!');
        }
  
        const data = await response.json()
  
        return data;
      };
  
      try {
        const items = await fetchData()
        dispatch(itemsActions.add(items));
      } catch (error) {
        alert(error)
      }
    }
  }