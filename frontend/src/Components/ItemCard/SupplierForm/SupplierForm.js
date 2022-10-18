import styles from './SupplierForm.module.css'

const SuppliersForm = (props) => {
    return (
        <div className={styles['supplier-container']}>
            <div>
                <label>Name:</label>
                <input type="text" name="supplierName"/>
            </div>
            <div>
                <label>Country:</label>
                <input type="text" name="supplierCountry"/>
            </div>
        </div>
    )
}

export default SuppliersForm