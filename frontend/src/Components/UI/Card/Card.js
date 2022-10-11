import styles from './Card.module.css'


const Card = (props) => {
    const onClickHandler = (e) => {
        if(props.onClick)
            props.onClick(e)
    }

    return (
        <div onClick={onClickHandler} className={props.className ? `${styles.card} ${props.className}` : styles.card}>
            {props.children}
        </div>
    )
}


export default Card