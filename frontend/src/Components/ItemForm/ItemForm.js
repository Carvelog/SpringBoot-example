import { useState } from 'react'

import Button from '../UI/Button/Button'
import Section from '../UI/Section/Section'
import styles from './ItemForm.module.css'

import itemService from "../../services/ItemService"
import { useDispatch } from 'react-redux'
import { itemsActions } from "../../store/items"

import PriceReductionForm from '../PriceReductionFrom/PriceReductionForm'
import SuppliersForm from '../SupplierForm/SupplierForm'

const ItemForm = () => {
    const [addSupplierComponent, setAddSupplierComponent] = useState([])
    const [addPriceReductionComponent, setAddPriceReductionComponent] = useState([])

    const dispatch = useDispatch()

    const addItemFormHandler = async (e) => {
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
            } else {
                priceReductionsList.push({
                    reducedPrice: e.target.discount.value,
                    startDate: e.target.startDate.value,
                    endDate: e.target.endDate.value
                })
            }
        }

        const itemData = {
            itemCode: e.target.itemCode.value,
            description: e.target.description.value,
            price: e.target.price.value ? e.target.price.value : 0,
            state: e.target.state.checked,
            suppliers: suppliersList,
            priceReductions: priceReductionsList
        }

        const itemSaved = await itemService.addNewItem(itemData)
        dispatch(itemsActions.addItem(itemSaved))

        e.target.itemCode.value = ''
        e.target.description.value = ''
        e.target.price.value = 0
        e.target.state.value = false

        window.location.reload()
    }

    const addSupplierHandler = () => {
        setAddSupplierComponent(addSupplierComponent.concat(<SuppliersForm key={addSupplierComponent.length} />))
    }

    const addReductionHandler = () => {
        setAddPriceReductionComponent(addPriceReductionComponent.concat(<PriceReductionForm key={addPriceReductionComponent.length} />))
    }

    return (
        <Section className={styles.section}>
            <div className={styles.header}>
                <h2>Add a new item</h2>
            </div>
            <form className={styles.form} onSubmit={addItemFormHandler}>
                <div>
                    <label>Item code:</label>
                    <input placeholder="i.e: 123" type="number" name="itemCode" required />
                </div>
                <div>
                    <label>Description:</label>
                    <input placeholder="i.e: Lampara" type="text" name="description" required />
                </div>
                <div>
                    <label>Price:</label>
                    <input placeholder="i.e: 25.50" type="number" step={0.01} min={0} name="price" />
                </div>
                <div>
                    <label>Item state active?</label>
                    <input className={styles['state-input']} placeholder='State' type="checkbox" name="state" />
                </div>
                <div>
                    <label>Suppliers:</label>
                    <Button className={styles['add-button']} onClick={addSupplierHandler}>Add</Button>
                    {addSupplierComponent && addSupplierComponent.map(c => {return c})}
                </div>
                <div>
                    <label>Price Reductions:</label>
                    <Button className={styles['add-button']} onClick={addReductionHandler}>Add</Button>
                    {addPriceReductionComponent && addPriceReductionComponent.map(co => {return co})}
                </div>
                <div>
                    <Button className={styles['button-submit']} type="submit">Add item</Button>
                </div>
            </form>
        </Section>
    )
}

export default ItemForm