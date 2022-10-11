import {useSelector } from "react-redux"

import Item from "../Item/Item"

const ItemList = () => {

    const items = useSelector(state => state.items.items)

    return (
       <div>
        {items.length !== 0 && items.map((e, i) => { return <Item id={i} key={i} item={e} /> })}
        {items.length === 0 && <p>No data</p>}
       </div>
    )
}

export default ItemList