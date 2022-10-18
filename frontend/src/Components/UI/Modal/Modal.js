import styles from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux';

import { modalActions } from '../../../store/modal'
import Button from '../Button/Button';

const Backdrop = (props) => {
    return <div className={`${styles.backdrop} closeModal`} onClick={props.onClose}>{props.children}</div>
}

const ModalContent = (props) => {
    return (
        <Backdrop onClose={props.onClose}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.title}>
                        <h2>{props.header}</h2>
                    </div>
                    <Button className='closeModal' onClick={props.onClose}>X</Button>
                </div>
                <div className={styles.modalContent}>
                    {props.content}
                </div>
                <div className={styles.modalFooter}>
                </div>
            </div>
        </Backdrop>
    )
}

const Modal = (props) => {
    const dispatch = useDispatch()

    const closeModalHandler = (e) => {
        if(!e.target.classList.contains('closeModal'))
            return null
        dispatch(modalActions.closeModal())
    }

    return (
        createPortal(
        <ModalContent 
            header={props.header}
            content={props.content}
            onClose={props.onClose ? props.onClose : closeModalHandler}
        />, 
        document.getElementById('modal')
        )
    )
}

export default Modal