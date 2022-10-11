import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"

const Item = (props) => {
    const onClickHandler = async (e) => {
        e.preventDefault()
        props.onClick(await itemService.getItem(props.item.itemCode))
    }

    return (
        <Card className={props.className} onClick={onClickHandler}>
            {props.item.description && <h2>{props.item.description}</h2>}
            {props.item.itemCode && <p>Item code: {props.item.itemCode}</p>}
            {props.item.state && <p>Item state: {props.item.state ? 'Activo' : 'Inactivo'}</p>}
            {props.item.price && <p>Price: {props.item.price}€</p>}
            {props.item.creationDate && <p>Creation date: {props.item.creationDate.split("T")[0]}</p>}
            {props.item.creator && <p>Creator: {props.item.creator.toString()}</p>}
        </Card>
    )
}


export default Item