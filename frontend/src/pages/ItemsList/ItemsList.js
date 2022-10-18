import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchItems, itemsActions } from '../../store/items';
import { modalActions } from "../../store/modal"

import Item from "../../Components/Item/Item"
import ItemCard from "../../Components/ItemCard/ItemCard"
import Modal from "../../Components/UI/Modal/Modal"
import Section from "../../Components/UI/Section/Section"

import itemService from "../../services/ItemService";

import styles from './ItemsList.module.css'

let initial = true

const ItemList = () => {
    const isModalOpen = useSelector(state => state.modal.isOpen)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const items = useSelector(state => state.items.items)

    const dispatch = useDispatch()
    const [item, setItem] = useState(false)
    const [filterActive, setFilterActive] = useState(false)
    

    const itemClickHandler = (item) => {
        dispatch(modalActions.openModal())
        setItem(item)
    }

    const filterHandler = async (e) => {
        if(e.target.value === 'all'){
            dispatch(fetchItems())
            setFilterActive(false)
        } else {
            setFilterActive(true)
            const filteredItems = await itemService.getItemByState(e.target.value)
            dispatch(itemsActions.add(filteredItems))
        }
    }

    useEffect(() => {
        if(!filterActive && isAuthenticated){      
            dispatch(fetchItems())
        }
    }, [isAuthenticated, dispatch, filterActive])

    return (
       <Section className={styles.section}>
            <div className={styles.filter}>
                <p>Filter</p>
                <select onChange={filterHandler}>
                    <option value="all">All</option>
                    <option value="true">Active</option>
                    <option value="false">Descontinuated</option>
                </select>
            </div>
            <div className={styles.content}>
                {isModalOpen && item && <Modal header='Item Data' content={<ItemCard item={item} />} />}
                {items.length !== 0 && items.map((e, i) => { return <Item className={styles.item} key={i} item={e} onClick={itemClickHandler} /> })}
                {items.length === 0 && <p>No data</p>}
            </div>
       </Section>
    )
}

export default ItemList