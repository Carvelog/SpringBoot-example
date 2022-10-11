import style from './Header.module.css'

import { modalActions } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../Modal/Modal'
import LoginForm from '../Forms/LoginForm/LoginForm'

import Button from '../UI/Button/Button'
import { useState } from 'react'
import { authActions } from '../../store/auth'
import { itemsActions } from '../../store/items'

import authService from '../../services/authService'

const Header = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [isLogup, setIsLogup] = useState(false)
    
    const dispatch = useDispatch()
    const isModalOpen = useSelector(state => state.modal.isOpen)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const loginHandler = () => {
        dispatch(modalActions.openModal())
        setIsLogin(true)
    }

    const logupHandler = () => {
        dispatch(modalActions.openModal())
        setIsLogup(true)
    }
    
    const logoutHandler = async () => {
        authService.logout()

        dispatch(itemsActions.remove())
        dispatch(authActions.signout())
    }

    const modalCloseHandler = (e) => {
        if(!e.target.classList.contains('closeModal'))
            return null
        dispatch(modalActions.closeModal())
        setIsLogin(false)
        setIsLogup(false)
    }

    return (
        <div className={style.header}>{
            !isAuthenticated ?
            <>
                <div className={style['sign-buttons-container']}>
                    <Button className={style.signButtons} onClick={loginHandler}>Log in</Button>
                    <Button className={style.signButtons} onClick={logupHandler}>Log up</Button>
                </div>
                {isModalOpen && isLogin && <Modal onClose={modalCloseHandler} content={<LoginForm isLogin={isLogin}/>}/>}
                {isModalOpen && isLogup && <Modal onClose={modalCloseHandler} content={<LoginForm isLogin={isLogin}/>}/>}
            </>
            :
            <div className={style['sign-buttons-container']}>
                <Button className={style.signButtons} onClick={logoutHandler}>Log out</Button>
            </div>
            }
        </div>
    )
}

export default Header;