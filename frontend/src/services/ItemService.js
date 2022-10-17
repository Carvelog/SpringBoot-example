import axios from "axios"

const getItems = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/products/products')
        if (response.status !== 200) {
          throw new Error('Could not fetch items data!')
        }

        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
    // const fetchData = async () => {
    //     const response = await fetch(
    //         'http://localhost:8080/api/products/products',
    //         {
    //             method: 'GET',
    //             redirect: 'follow',
    //             credentials: 'same-origin',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         }
    //     )
  
    //     if (!response.ok) {
    //       throw new Error('Could not fetch items data!')
    //     }
  
    //     const data = await response.json()
    //     return data
    // }

    // try {
    //     const items = await fetchData()
    //     return items
    // } catch (error) {
    //     alert(error)
    // }
}

const getItem = async (itemCode) => {
    const fetchData = async (itemCode) => {
        const response = await fetch(
            `http://localhost:8080/api/products/product?itemCode=${itemCode}`,
            {
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
  
        if (!response.ok) {
          throw new Error('Could not fetch item with item code: ' + itemCode)
        }
  
        const data = await response.json()
        return data
    }

    try {
        const item = await fetchData(itemCode)
        return item
    } catch (error) {
        alert(error)
    }
}

const addNewItem = async (newItem) => {
    const fetchData = async (newItem) => {
        const response = await fetch(
            'http://localhost:8080/api/products/product',
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem)
            }
        )
  
        if (!response.ok) {
          throw new Error('There was a problem saving the new item')
        }
  
        const data = await response.json()
        return data
    }

    try {
        const user = await fetchData(newItem)
        return user
    } catch (error) {
        alert(error)
    }
}

const itemCreator = async (creatorId) => {
    const fetchData = async (creatorId) => {
        const response = await fetch(
            `http://localhost:8080/api/users/user?id=${creatorId}`,
            {
                method: 'GET',
                redirect: 'follow',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
  
        if (!response.ok) {
          throw new Error('Could not fetch user with id: ' + creatorId)
        }
  
        const data = await response.json()
        return data
    }

    try {
        const user = await fetchData(creatorId)
        return user
    } catch (error) {
        alert(error)
    }
}

const changeItemState = async (itemId, reason) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/products/product/changestate?id=${itemId}`, {
            productId: itemId,
            description: reason
        })
        if (response.status !== 200) {
          throw new Error('Change state not possible')
        }
        const data = await response.data
        return data
    } catch (error) {
        console.error(error)
    }
}

const updateItem = async (itemId, newItemData) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/products/product?id=${itemId}`, { ...newItemData })
        if (response.status !== 200) {
          throw new Error('Change state not possible')
        }
        const data = await response.data
        return data
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
    changeItemState
}

export default itemService