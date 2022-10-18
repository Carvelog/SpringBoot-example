import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/users'
})

const saveNewUser = async (newUser) => {
    try{
        const response = await api.post('/user', { ...newUser })
        return response.data
    } catch (error) {
        alert(error.response.data)
    }
}

const deleteUser = async (username) => {
    try{
        await api.delete(`/user?username=${username}`)
    } catch (error) {
        alert(error.response.data)
    }
}

const getUsers = async () => {
    try{
        const response = await api.get('/users')
        return response.data
    } catch (error) {
        alert(error.response.data)
    }
}

const userService = {
    saveNewUser,
    deleteUser,
    getUsers
}

export default userService