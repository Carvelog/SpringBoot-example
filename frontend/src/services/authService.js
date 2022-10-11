const AUTH_API_URL = 'http://localhost:8080/auth/'

const logup = async (username, password) => {
    const sendData = async () => {
        const response = await fetch(
        AUTH_API_URL + 'signup',
        {
            method: 'POST',
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
      window.location.reload()
    } catch (error) {
      alert(error)
    }
}

const login = async (username, password) => {
    const sendData = async () => {
        const response = await fetch(
        AUTH_API_URL + 'signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }
        )

        if (!response.ok) {
        throw new Error('Could not login the user data!');
        }

        const data = await response.json()
        return data;
    }

    try {
      const data = await sendData()
      localStorage.setItem("user", JSON.stringify(data))
      window.location.reload()
    } catch (error) {
      alert(error)
    }
}

const logout = async () => {
    
    const sendData = async () => {
        const response = await fetch(
        AUTH_API_URL + 'signout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        if (!response.ok) {
        throw new Error('Could not login the user data!');
        }

        // const data = await response.json()

        // return data;
    }

    try {
      const data = await sendData()
      localStorage.removeItem("user");
      window.location.reload()
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