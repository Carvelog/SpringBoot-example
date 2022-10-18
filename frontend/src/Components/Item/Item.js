import { useState, useEffect } from "react"

import Card from "../UI/Card/Card"
import Button from "../UI/Button/Button"

import { useDispatch, useSelector } from "react-redux"

import itemService from "../../services/ItemService"
import styles from './Item.module.css'
import { itemsActions } from "../../store/items"

const Item = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const [itemCreator, setItemCreator] = useState('')

    const dispatch = useDispatch()

    const onClickHandler = async (e) => {
        e.preventDefault()
        props.onClick(await itemService.getItem(props.item.itemCode))
    }

    const deleteItemHandler = async (e) => {
        e.stopPropagation()

        dispatch(itemsActions.deleteItem(props.item.id))
        alert(await itemService.deleteItem(props.item.id))
    }

    useEffect(() => {
        const getItemCreator = async (creatorId) => {
            const response = await itemService.itemCreator(creatorId)
            return response
        }
        getItemCreator(props.item.creatorId).then(user => setItemCreator(user))
    }, [props])

    return (
        <Card className={props.className} onClick={onClickHandler}>
            <div className={styles['item-header']}>
                {props.item.description && <h2>{props.item.description}</h2>}
                {isAdmin && <Button onClick={deleteItemHandler}>delete</Button>}
            </div>
            <table>
                <tbody>    
                    {props.item.itemCode && <tr>
                        <td>Item code:</td>
                        <td>{props.item.itemCode}</td>
                    </tr>
                    }
                    <tr>
                        <td>Item state:</td>
                        <td>{props.item.state ? 'Activo' : 'Descontinuado'}</td>

                    </tr>
                    {props.item.price && <tr>
                        <td>Price: €</td>
                        <td>{props.item.price}</td>
                    </tr>
                    }
                    {props.item.creationDate && <tr>
                        <td>Creation date:</td>
                        <td>{props.item.creationDate.split("T")[0]}</td>
                    </tr>
                    }
                     {itemCreator != null && <tr>
                        <td>Creator:</td>
                        <td>{itemCreator.username}</td>
                    </tr>
                    }
                </tbody>
            </table>
        </Card>
    )
}

export default Item