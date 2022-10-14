import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"
import styles from './ItemCard.module.css'

import { itemsActions } from "../../store/items"

const ItemCard = (props) => {
    const [itemCreator, setItemCreator] = useState('')
    const [item, setItem] = useState(props.item ? props.item : {})

    const dispatch = useDispatch()

    useEffect(() => {
        const getItemCreator = async (creatorId) => {
            const response = await itemService.itemCreator(creatorId)
            return response
        }
        getItemCreator(item.creatorId).then(user => setItemCreator(user))
    }, [item.creatorId])

    const changeItemStateHandler = async (e) => {
        const updatedItem = await itemService.changeItemState(item.id)
        setItem(updatedItem)
        dispatch(itemsActions.update(updatedItem))
    }

    useEffect(() => {
        setItem(props.item)
    }, [props.item])

    return (
        <Card className={styles.itemCard}>
            {item.description && <h2>{item.description}</h2>}
            {item.itemCode && <p>Item code: {item.itemCode}</p>}
            <div>
                <p>Item state: {item.state ? 'Activo' : 'Descontinuado'}</p>
                <button onClick={changeItemStateHandler}>{item.state ? 'Descontinuar' : 'Activar'}</button>
            </div>
            {item.price && <p>Price: {item.price}€</p>}
            {item.creationDate && <p>Creation date: {item.creationDate.split("T")[0]}</p>}
            {itemCreator != null && <p>Creator: {itemCreator.username}</p>}
            {item.suppliers.length > 0 && 
                <div>
                    <p>Suppliers:</p>
                    <ul className={styles.suppliers}>
                    {item.suppliers.map((e, i) => {
                        return (
                            <li key={i}>
                                <div> 
                                    <p>Name: {e.name}</p>
                                    <p>Country: {e.country}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            }
            {item.priceReductions.length > 0 && 
                <div>
                    <p>Peduced Price:</p>
                    <ul className={styles.reducedPrice}>
                    {item.priceReductions.map((e, i) => {
                        return (
                            <li key={i}>
                                <div>
                                    <p>{(e.reducedPrice) * 100}%</p>
                                    <p>From: {e.startDate.split("T")[0]} To: {e.endDate.split("T")[0]}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
            }
        </Card>
    )
}

export default ItemCard