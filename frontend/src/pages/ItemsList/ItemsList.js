import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { modalActions } from "../../store/modal"

import { fetchItems } from "../../store/items"
import { authActions } from "../../store/auth"

import Item from "../../Components/Item/Item"
import ItemCard from "../../Components/ItemCard/ItemCard"
import Modal from "../../Components/UI/Modal/Modal"

import styles from './ItemsList.module.css'

let isInitial = true

const ItemList = () => {
    const dispatch = useDispatch()
    const [item, setItem] = useState(false)
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const isModalOpen = useSelector(state => state.modal.isOpen)
    const items = useSelector(state => state.items.items)

    useEffect(() => {
        if(isAuthenticated)
            dispatch(fetchItems())
    }, [isAuthenticated, dispatch])

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user){
        dispatch(authActions.signin())
        } else {
        dispatch(authActions.signout())
        }

        if(isInitial) {
        isInitial = false
        return
        }

        if(isAuthenticated)
        dispatch(fetchItems())
    }, [isAuthenticated, dispatch])

    const itemClickHandler = (item) => {
        dispatch(modalActions.openModal())
        setItem(item)
    }

    return (
       <section>
        {isModalOpen && item && <Modal header='Item Data' content={<ItemCard item={item} />} />}
        {items.length !== 0 && items.map((e, i) => { return <Item className={styles.item} key={i} item={e} onClick={itemClickHandler} /> })}
        {items.length === 0 && <p>No data</p>}
       </section>
    )
}

export default ItemList