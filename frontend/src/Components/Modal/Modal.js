import styles from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux';

import { modalActions } from '../../store/modal'

const ModalContent = () => {
    const isModalOpen = useSelector(state => state.modal.isOpen)

    return (
        <div className={styles.modal}>
            <p>MODAL</p>
        </div>
    )
}

const Modal = () => {
    return createPortal(ModalContent, document.getElementById('modal'));
}

export default Modal