import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"

const Item = (props) => {
    const onClickHandler = async (e) => {
        e.preventDefault()
        props.onClick(await itemService.getItem(props.item.itemCode))
    }

    const changeItemStateHandler = async () => {
        console.log(props.item.id)
        await itemService.changeItemState(props.item.id)
    }

    return (
        <Card className={props.className} onClick={onClickHandler}>
            {props.item.description && <h2>{props.item.description}</h2>}
            {props.item.itemCode && <p>Item code: {props.item.itemCode}</p>}
            <div>
                <p>Item state: {props.item.state ? 'Activo' : 'Inactivo'}</p>
                <button onClick={changeItemStateHandler}>{props.item.state ? 'Desactivar' : 'Activar'}</button>
            </div>
            {props.item.price && <p>Price: {props.item.price}€</p>}
            {props.item.creationDate && <p>Creation date: {props.item.creationDate.split("T")[0]}</p>}
            {props.item.creator && <p>Creator: {props.item.creator.toString()}</p>}
        </Card>
    )
}


export default Item