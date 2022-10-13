import axios from "axios";
const AUTH_API_URL = 'http://localhost:8080/auth/'

const instance = axios.create({
    withCredentials: true
})

const logup = async (username, password) => {
    // try {
    //     // const response = await instance.post('http://localhost:8080/auth/signup', { username, password }, { withCredentials: true })
    //     const response = await instance.post('http://localhost:8080/auth/signup', { username, password })

    //     if (response.status !== 200) {
    //       throw new Error('Could not logup the user');
    //     }

    //     const data = await response.data
    //     localStorage.setItem("user", JSON.stringify(data))
    // } catch (error) {
    //     console.error(error);
    // }
    const sendData = async () => {
        const response = await fetch(
        AUTH_API_URL + 'signup',
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }
        )

        if (!response.ok) {
        throw new Error('Could not logup the user data!');
        }

        const data = await response.json()
        return data;
    }

    try {
      const data = await sendData()
      localStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      alert(error)
    }
}

const login = async (username, password) => {
    try {
        // const response = await axios.post( 'http://localhost:8080/auth/signin', { username, password}, { withCredentials: true})
        const response = await axios.post( 'http://localhost:8080/auth/signin', { username, password})


        if (response.status !== 200) {
          throw new Error('Could not logup the user');
        }

        const data = await response.data
        localStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
        console.error(error);
    }
    // const sendData = async () => {
    //     const response = await fetch(
    //     AUTH_API_URL + 'signin',
    //     {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({username, password})
    //     }
    //     )

    //     if (!response.ok) {
    //     throw new Error('Could not login the user data!');
    //     }

    //     const data = await response.json()
    //     return data;
    // }

    // try {
    //   const data = await sendData()
    //   localStorage.setItem("user", JSON.stringify(data))
    // } catch (error) {
    //   alert(error)
    // }
}

const logout = async () => {
    
    const sendData = async () => {
        const response = await fetch(
        AUTH_API_URL + 'signout',
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        if (!response.ok) {
        throw new Error('Could not login the user data!');
        }
    }

    try {
      await sendData()
      localStorage.removeItem("user");
    } catch (error) {
      alert(error)
    }
}

const getCurrentUser = () => {
    // if(localStorage.getItem("user") !== undefined)
    //     return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
    login,
    logup,
    logout,
    getCurrentUser
}

export default AuthService