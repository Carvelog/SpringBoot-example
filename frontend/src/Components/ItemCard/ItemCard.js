import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import itemService from "../../services/ItemService"
import Card from "../UI/Card/Card"
import styles from './ItemCard.module.css'
import Button from '../UI/Button/Button'

import { itemsActions } from "../../store/items"

import SuppliersForm from './SupplierForm/SupplierForm'
import PriceReductionForm from './PriceReductionFrom/PriceReductionForm'

const ItemCard = (props) => {
    const [itemCreator, setItemCreator] = useState('')
    const [item, setItem] = useState(props.item ? props.item : {})
    const [reason, setReason] = useState('')
    const [showReasonForm, setShowReasonForm] = useState(false)

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

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
            suppliers: suppliersList,
            priceReductions: priceReductionsList
        }
        
        if(item){
            const updatedItem = await itemService.updateItem(item.id, newItemData)
            setItem(updatedItem)
            dispatch(itemsActions.update(updatedItem))
            setIsModified(false)
        }
    }

    useEffect(() => {
        setDescription(item.description)
        setPrice(item.price)
    }, [item])

    useEffect(() => {
        setItem(props.item)
    }, [props.item])

    return (
        <Card className={styles.itemCard}>
            <form onSubmit={saveChangesHandler}>
                {item.description && <input className={styles.description} name="description" value={description} onChange={itemDataHandler}/>}
                <table>
                    <tbody>
                    {item.itemCode && <tr>
                            <td>Item code:</td>
                            <td>{item.itemCode}</td>
                        </tr>
                    }
                    <tr>
                        <td>Item state:</td>
                        <td>
                            {item.state ? 'Activo' : 'Descontinuado'}
                            <Button className={styles['reason-button']} onClick={() => {setShowReasonForm(!showReasonForm)}}>{item.state ? 'Descontinuar' : 'Activar'}</Button>
                        </td>
                    </tr>
                    <tr>
                        {
                            showReasonForm && 
                            <td colSpan="2" className={styles['reason-form']}>
                                <label>Reason:</label>
                                <textarea name="reason" value={reason} rows="6" cols="50" onChange={reasonHandler} />
                                <Button onClick={changeItemStateHandler}>Save</Button>
                            </td>
                        }
                    </tr>
                    {item.price && <tr>
                            <td>Price: €</td>
                            <td><input className={styles['item-input-data']} type="number" name="price" value={price} onChange={itemDataHandler}/></td>
                        </tr>
                    }
                    {item.creationDate && <tr>
                            <td>Creation date:</td>
                            <td>{item.creationDate.split("T")[0]}</td>
                        </tr>
                    }
                    {itemCreator != null && <tr>
                        <td>Creator:</td>
                        <td>{itemCreator.username}</td>
                    </tr>
                    }
                    </tbody>
                </table>    
                <div>
                    <div className={styles['add-new-section']}>
                        <p>Suppliers:</p>
                        <Button onClick={addSupplierHandler}>Add</Button>
                    </div>
                    <div className={styles['add-new-form-section']}>
                        {addSupplierComponent && addSupplierComponent.map(c => {return c})}
                    </div>
                    {item && item.suppliers.length > 0 &&
                        <table className={styles.subtable}>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                </tr>
                            {item.suppliers.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>{e.country}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    }
                </div>
                <div>
                    <div className={styles['add-new-section']}>
                        <p>Peduced Price:</p>
                        <Button className={styles['add-button']} onClick={addReductionHandler}>Add</Button>
                    </div>
                    <div className={styles['add-new-form-section']}>
                        {addPriceReductionComponent && addPriceReductionComponent.map(co => {return co})}
                    </div>
                    {item && item.priceReductions.length > 0 && 
                        <table className={styles.subtable}>
                            <tbody>
                                <tr>
                                    <th>Percent (%)</th>
                                    <th>From</th>
                                    <th>To</th>
                                </tr>
                            {item.priceReductions.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{(e.reducedPrice) * 100}</td>
                                        <td>{e.startDate.split("T")[0]}</td>
                                        <td>{e.endDate.split("T")[0]}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    }
                </div>
                {isModified && <Button className={styles['button-save-changes']} type="submit">Save changes</Button>}
            </form>
        </Card>
    )
}

export default ItemCard