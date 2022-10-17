import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"
import styles from './ItemCard.module.css'
import Button from '../UI/Button/Button'

import { itemsActions } from "../../store/items"

import SuppliersForm from '../SupplierForm/SupplierForm'
import PriceReductionForm from '../PriceReductionFrom/PriceReductionForm'

const ItemCard = (props) => {
    const [itemCreator, setItemCreator] = useState('')
    const [item, setItem] = useState(props.item ? props.item : {})
    const [reason, setReason] = useState('')
    const [showReasonForm, setShowReasonForm] = useState(false)

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [creationDate, setCreationDate] = useState('')

    const [addSupplierComponent, setAddSupplierComponent] = useState([])
    const [addPriceReductionComponent, setAddPriceReductionComponent] = useState([])

    const [isModified, setIsModified] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const getItemCreator = async (creatorId) => {
            const response = await itemService.itemCreator(creatorId)
            return response
        }
        getItemCreator(item.creatorId).then(user => setItemCreator(user))
    }, [item.creatorId])

    const changeItemStateHandler = async (e) => {
        e.preventDefault()

        if(reason === ''){
            alert('A reason should be specified')
            return
        }
        const updatedItem = await itemService.changeItemState(item.id, reason)
        setItem(updatedItem)
        dispatch(itemsActions.update(updatedItem))
        setReason('')
        setShowReasonForm(false)
    }

    const reasonHandler = (e) => {
        setReason(e.target.value)
    }

    const itemDataHandler = (e) => {
        setIsModified(true)
        if(e.target.name === 'description')
            setDescription(e.target.value)
        if(e.target.name === 'price')
            setPrice(e.target.value)
        if(e.target.name === 'creationDate')
            setCreationDate(e.target.value)
    }

    const addSupplierHandler = () => {
        setIsModified(true)
        setAddSupplierComponent(addSupplierComponent.concat(<SuppliersForm key={addSupplierComponent.length} />))
    }

    const addReductionHandler = () => {
        setIsModified(true)
        setAddPriceReductionComponent(addPriceReductionComponent.concat(<PriceReductionForm key={addPriceReductionComponent.length} />))
    }

    const saveChangesHandler = async (e) => {
        e.preventDefault()
        
        let suppliersList = []
        if(e.target.supplierName && e.target.supplierCountry){
            if(e.target.supplierName.length && e.target.supplierCountry.length){
                e.target.supplierName.forEach((el,i) => {
                    suppliersList.push({
                        name: el.value,
                        country: e.target.supplierCountry[i].value
                    })
                })
            } else {
                suppliersList.push({
                    name: e.target.supplierName.value,
                    country: e.target.supplierCountry.value
                })
            }
        }

        let priceReductionsList = []
        if(e.target.discount && e.target.startDate && e.target.endDate){
            if(e.target.discount.length && e.target.startDate.length && e.target.endDate.length){
                e.target.discount.forEach((el,i) => {
                    priceReductionsList.push({
                        reducedPrice: el.value,
                        startDate: e.target.startDate[i].value,
                        endDate: e.target.endDate[i].value
                    })
                })
            } else if( e.target.discount.value !== '' && e.target.startDate.value !== '' && e.target.endDate.value !== '' ){
                priceReductionsList.push({
                    reducedPrice: e.target.discount.value,
                    startDate: e.target.startDate.value,
                    endDate: e.target.endDate.value
                })
            }
        }

        const newItemData = {
            description,
            price,
            creationDate,
            suppliers: suppliersList,
            priceReductions: priceReductionsList
        }

        const updatedItem = await itemService.updateItem(item.id, newItemData)
        if(updatedItem)
            dispatch(itemsActions.update(updatedItem))
        setIsModified(false)
    }

    useEffect(() => {
        setItem(props.item)
        setDescription(item.description)
        setPrice(item.price)
        setCreationDate(item.creationDate.split("T")[0])
    }, [props.item, item])

    return (
        <Card className={styles.itemCard}>
            <form onSubmit={saveChangesHandler}>
                {item.description && <input className={styles.description} name="description" value={description} onChange={itemDataHandler}/>}
                {item.itemCode && <p>Item code: {item.itemCode}</p>}
                <div>
                    <p>Item state: {item.state ? 'Activo' : 'Descontinuado'}</p>
                    <Button onClick={() => {setShowReasonForm(!showReasonForm)}}>{item.state ? 'Descontinuar' : 'Activar'}</Button>
                    {
                    showReasonForm && 
                    <div>
                        <label>Reason:</label>
                        <textarea name="reason" value={reason} onChange={reasonHandler} />
                        <Button onClick={changeItemStateHandler}>Save</Button>
                    </div>
                    }
                </div>
                {item.price && <p>Price: €<input className={styles['item-input-data']} name="price" value={price} onChange={itemDataHandler}/></p>}
                {item.creationDate && <p>Creation date: <input className={styles['item-input-data']} type="date" name="creationDate" value={creationDate} onChange={itemDataHandler}/></p>}
                {itemCreator != null && <p>Creator: {itemCreator.username}</p>}
                
                <div>
                    <div className={styles['add-new-section']}>
                        <p>Suppliers:</p>
                        <Button onClick={addSupplierHandler}>Add</Button>
                    </div>
                    <div className={styles['add-new-form-section']}>
                        {addSupplierComponent && addSupplierComponent.map(c => {return c})}
                    </div>
                    <ul className={styles.suppliers}>
                    {item.suppliers.map((e, i) => {
                        return (
                            <li key={i}>
                                <div> 
                                    <p>Name: {e.name}</p>
                                    <p>Country: {e.country}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <div>
                    <div className={styles['add-new-section']}>
                        <p>Peduced Price:</p>
                        <Button className={styles['add-button']} onClick={addReductionHandler}>Add</Button>
                    </div>
                    <div className={styles['add-new-form-section']}>
                        {addPriceReductionComponent && addPriceReductionComponent.map(co => {return co})}
                    </div>
                    <ul className={styles.reducedPrice}>
                    {item.priceReductions.map((e, i) => {
                        return (
                            <li key={i}>
                                <div>
                                    <p>{(e.reducedPrice) * 100}%</p>
                                    <p>From: {e.startDate.split("T")[0]} To: {e.endDate.split("T")[0]}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                {isModified && <Button type="submit">Save changes</Button>}
            </form>
        </Card>
    )
}

export default ItemCard