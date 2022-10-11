import Card from "../UI/Card/Card"

const Item = (props) => {
    const onClickHandler = (e) => {
        console.log(props.item.itemCode)
    }

    return (
        <Card onClick={onClickHandler}>
            <h2>{props.item.description}</h2>
            <p>Item code: {props.item.itemCode}</p>
            <p>Item state: {props.item.state ? 'Activo' : 'Inactivo'}</p>
            <p>Price: {props.item.price}€</p>
            <p>Creation date: {props.item.creationDate}</p>
            <p>Creator: {props.item.creator}</p>
        </Card>
    )
}


export default Item