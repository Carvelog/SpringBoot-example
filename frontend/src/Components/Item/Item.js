import Card from "../UI/Card/Card"

import itemService from "../../services/ItemService";

const Item = (props) => {
    const onClickHandler = async (e) => {
        e.preventDefault()
        props.onClick(await itemService.getItem(props.item.itemCode))
    }

    return (
        <Card className={props.className} onClick={onClickHandler}>
            {props.item.description && <h2>{props.item.description}</h2>}
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