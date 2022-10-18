import styles from './PriceReductionForm.module.css'

const PriceReductionForm = (props) => {
    return (
        <div className={styles['price-reduction-container']}>
            <div>
                <label>Discount (%):</label>
                <input type="number" step='0.01' min='0' max='1' name="discount"/>
            </div>
            <div>
                <label>Start date:</label>
                <input type="date" name="startDate"/>
            </div>
            <div>
                <label>End date:</label>
                <input type="date" name="endDate"/>
            </div>
        </div>
    )
}

export default PriceReductionForm