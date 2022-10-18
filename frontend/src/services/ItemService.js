import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/products'
})

const getItems = async () => {
    try{
        const response = await api.get('/products')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getItem = async (itemCode) => {
    try{
        const response = await api.get(`/product?itemCode=${itemCode}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const addNewItem = async (newItem) => {
    try{
        const response = await api.post('/product', {...newItem})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const itemCreator = async (creatorId) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/users/user?id=${creatorId}`, {withCredentials: true})
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const changeItemState = async (itemId, reason) => {
    try{
        const response = await api.put(`product/changestate?id=${itemId}`, { productId: itemId, description: reason })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const updateItem = async (itemId, newItemData) => {
    try{
        const response = await api.put(`/product?id=${itemId}`, { ...newItemData })
        return response.data
    } catch (error) {
        alert(error.response.data)
    }
}

const deleteItem = async (itemId) => {
    try{
        const response = await api.delete(`/product?id=${itemId}`)
        return response.data
    } catch (error) {
        alert(error.response.data)
    }
}

const getItemByState = async (state) => {
    try{
        const response = await api.get(`product/state?state=${state}`)
        return response.data
    } catch (error) {
        alert(error.response.data)
    }
}

const itemService = {
    getItems,
    getItem,
    addNewItem,
    itemCreator,
    updateItem,
    changeItemState,
    deleteItem,
    getItemByState
}

export default itemService