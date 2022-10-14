import styles from './Button.module.css'


const Button = (props) => {
    return <button type={props.type ? props.type : 'button'} onClick={props.onClick} className={props.className ? `${styles.button} ${props.className}` : styles.button}>{props.children}</button>
}

export default Button