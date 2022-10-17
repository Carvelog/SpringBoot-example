import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/auth'
})

const logup = async (username, password) => {
    return await api.post('/signup', { username, password })
}

const login = async (username, password) => {
    return await api.post('/signin', { username, password })
}

const logout = async () => {
    
    await api.post('/signout')
    localStorage.removeItem("user");
}

const AuthService = {
    login,
    logup,
    logout
}

export default AuthService