const SuppliersForm = (props) => {
    return (
        <div>
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