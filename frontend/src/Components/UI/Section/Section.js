import styles from './Section.module.css'

const Section = (props) => {
    return <section className={props.className ? `${styles.section} ${props.className}` : styles.section}>{props.children}</section>
}

export default Section