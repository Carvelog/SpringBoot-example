import { useEffect, useState } from "react"
import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"
import styles from './ItemCard.module.css'

const ItemCard = (props) => {
    const [itemCreator, setItemCreator] = useState('')

    useEffect(() => {
        const getItemCreator = async (creatorId) => {
            const response = await itemService.itemCreator(creatorId)
            return response
        }
        getItemCreator(props.item.creatorId).then(user => setItemCreator(user))
    }, [props.item.creatorId])


    return (
        <Card className={styles.itemCard}>
            {props.item.description && <h2>{props.item.description}</h2>}
            {props.item.itemCode && <p>Item code: {props.item.itemCode}</p>}
            <p>Item state: {props.item.state ? 'Activo' : 'Inactivo'}</p>
            {props.item.price && <p>Price: {props.item.price}€</p>}
            {props.item.creationDate && <p>Creation date: {props.item.creationDate.split("T")[0]}</p>}
            {itemCreator != null && <p>Creator: {itemCreator.username}</p>}
            {props.item.suppliers.length > 0 && 
                <div>
                    <p>Suppliers:</p>
                    <ul className={styles.suppliers}>
                    {props.item.suppliers.map((e, i) => {
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
            {props.item.priceReductions.length > 0 && 
                <div>
                    <p>Peduced Price:</p>
                    <ul className={styles.reducedPrice}>
                    {props.item.priceReductions.map((e, i) => {
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