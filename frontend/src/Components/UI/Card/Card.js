import styles from './Card.module.css'


const Card = (props) => {
    const onClickHandler = (e) => {
        props.onClick(e)
    }

    return (
        <div onClick={onClickHandler} className={styles.card}>
            {props.children}
        </div>
    )
}


export default Card