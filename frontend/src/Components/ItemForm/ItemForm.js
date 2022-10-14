import { useState } from 'react'

import Button from '../UI/Button/Button'
import Section from '../UI/Section/Section'
import styles from './ItemForm.module.css'

import itemService from "../../services/ItemService"
import { useDispatch } from 'react-redux'
import { itemsActions } from "../../store/items"
import SuppliersForm from '../SupplierForm/SupplierForm'

const ItemForm = () => {
    const [addSupplierComponent, setAddSupplierComponent] = useState([])

    const dispatch = useDispatch()

    const addItemFormHandler = async (e) => {
        e.preventDefault()

        let suppliersList = []
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

        console.log(suppliersList)

        const itemData = {
            itemCode: e.target.itemCode.value,
            description: e.target.description.value,
            price: e.target.price.value ? e.target.price.value : 0,
            state: e.target.state.checked,
            suppliers: suppliersList
        }

        const itemSaved = await itemService.addNewItem(itemData)
        dispatch(itemsActions.addItem(itemSaved))

        e.target.itemCode.value = ''
        e.target.description.value = ''
        e.target.price.value = 0
        e.target.state.value = false

        // window.location.reload()
    }

    const addSupplierHandler = () => {
        console.log('add suplier form')
        setAddSupplierComponent(addSupplierComponent.concat(<SuppliersForm key={addSupplierComponent.length} />))
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
                    <Button onClick={addSupplierHandler}>Add supplier</Button>
                    {addSupplierComponent && addSupplierComponent.map(c => {return c})}
                </div>
                <div>
                    <Button className={styles['button-submit']} type="submit">Add item</Button>
                </div>
            </form>
        </Section>
    )
}

export default ItemForm