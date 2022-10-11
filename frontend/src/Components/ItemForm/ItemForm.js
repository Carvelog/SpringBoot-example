
const ItemForm = () => {
    return (
        <form>
            <input placeholder='Item code' type="text" name="itemCode" value="" />
            <input placeholder='Description' type="text" name="description" value="" />
            <input placeholder='Price' type="text" name="price" value="" />
            <input placeholder='State' type="text" name="state" value="" />
        </form>
    )
}

export default ItemForm