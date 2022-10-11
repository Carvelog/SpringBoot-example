import { useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import { modalActions } from "../../store/modal"

import Item from "../Item/Item"
import ItemCard from "../ItemCard/ItemCard"
import Modal from "../UI/Modal/Modal"

import styles from './ItemsList.module.css'

const ItemList = () => {

    const [item, setItem] = useState(false)
    const dispatch = useDispatch()

    const isModalOpen = useSelector(state => state.modal.isOpen)
    const items = useSelector(state => state.items.items)

    const itemClickHandler = (item) => {
        dispatch(modalActions.openModal())
        setItem(item)
    }

    return (
       <div>
        {isModalOpen && item && <Modal header='Item Data' content={<ItemCard item={item} />} />}
        {items.length !== 0 && items.map((e, i) => { return <Item className={styles.item} key={i} item={e} onClick={itemClickHandler} /> })}
        {items.length === 0 && <p>No data</p>}
       </div>
    )
}

export default ItemList