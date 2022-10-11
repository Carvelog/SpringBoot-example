const ITEM_API_URL = 'http://localhost:8080/api/products/'

const getItems = async () => {
    const fetchData = async () => {
        const response = await fetch(
            ITEM_API_URL + 'products',
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
        return items
    } catch (error) {
        alert(error)
    }
}

const getItem = async (itemCode) => {
    const fetchData = async (itemCode) => {
        const response = await fetch(
            ITEM_API_URL + `product?itemCode=${itemCode}`,
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
          throw new Error('Could not fetch item with item code: ' + itemCode)
        }
  
        const data = await response.json()
        return data
    };

    try {
        const item = await fetchData(itemCode)
        return item
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
                cors: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch user with id: ' + creatorId)
        }
  
        const data = await response.json()
        return data
    };

    try {
        const user = await fetchData(creatorId)
        return user
    } catch (error) {
        alert(error)
    }
}

const itemService = {
    getItems,
    getItem,
    itemCreator
}

export default itemService