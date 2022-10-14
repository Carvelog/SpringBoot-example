import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchItems } from '../../store/items';
import { modalActions } from "../../store/modal"

import Item from "../../Components/Item/Item"
import ItemCard from "../../Components/ItemCard/ItemCard"
import Modal from "../../Components/UI/Modal/Modal"
import Section from "../../Components/UI/Section/Section"

import styles from './ItemsList.module.css'

const ItemList = () => {
    const isModalOpen = useSelector(state => state.modal.isOpen)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const items = useSelector(state => state.items.items)

    const dispatch = useDispatch()
    const [item, setItem] = useState(false)
    

    const itemClickHandler = (item) => {
        dispatch(modalActions.openModal())
        setItem(item)
    }

    useEffect(() => {
        console.log(isAuthenticated)
        if(isAuthenticated)
            dispatch(fetchItems())
    }, [isAuthenticated, dispatch])

    return (
       <Section className={styles.section}>
            {isModalOpen && item && <Modal header='Item Data' content={<ItemCard item={item} />} />}
            {items.length !== 0 && items.map((e, i) => { return <Item className={styles.item} key={i} item={e} onClick={itemClickHandler} /> })}
            {items.length === 0 && <p>No data</p>}
       </Section>
    )
}

export default ItemList