import Card from "../UI/Card/Card"
import Button from "../UI/Button/Button"

import { useSelector } from "react-redux"

import itemService from "../../services/ItemService"
import styles from './Item.module.css'

const Item = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)

    const onClickHandler = async (e) => {
        e.preventDefault()
        props.onClick(await itemService.getItem(props.item.itemCode))
    }

    const deleteItemHandler = async (e) => {
        e.stopPropagation()
        
        alert(await itemService.deleteItem(props.item.id))
        
    }

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
                </tbody>
            </table>
        </Card>
    )
}

export default Item