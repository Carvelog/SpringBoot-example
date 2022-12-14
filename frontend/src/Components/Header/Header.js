import styles from './Header.module.css'
import { NavLink, useNavigate } from "react-router-dom"

import { modalActions } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../UI/Modal/Modal'
import LoginForm from '../LoginForm/LoginForm'

import Button from '../UI/Button/Button'
import { useState } from 'react'
import { authActions } from '../../store/auth'
import { itemsActions } from '../../store/items'

import authService from '../../services/authService'

const Header = () => {

    const [isLogin, setIsLogin] = useState(false)
    const [isLogup, setIsLogup] = useState(false)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isModalOpen = useSelector(state => state.modal.isOpen)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const isAdmin = useSelector(state => state.auth.isAdmin)

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

        navigate('/')
    }

    const modalCloseHandler = (e) => {
        if(!e.target.classList.contains('closeModal'))
            return null
        dispatch(modalActions.closeModal())
        setIsLogin(false)
        setIsLogup(false)
    }

    return (
        <div className={styles.header}>
            <nav className={styles['nav-container']}>
                {
                isAuthenticated &&
                <div>
                    <NavLink className={styles['nav-button']} style={{ textDecoration: 'none' }} to="/items">Items</NavLink>
                    <NavLink className={styles['nav-button']} style={{ textDecoration: 'none' }} to="/newitem"><span>Add Item</span></NavLink>
                </div>
                }
            </nav>

            <div className={styles['sign-buttons-container']}>
                {
                    !isAuthenticated ?
                    <div className={styles['sign-buttons']}>
                        <Button onClick={loginHandler}>Log in</Button>
                        <Button onClick={logupHandler}>Log up</Button>
                    </div>
                    :
                    <div className={styles['logout-button']}>
                        <Button onClick={logoutHandler}>Log out</Button>
                        {isAdmin && <NavLink className={styles['nav-button']} style={{ textDecoration: 'none' }} to="/admin-dashboard">Dashboard</NavLink>}
                    </div>
                }
            </div>
            {isModalOpen && isLogin && <Modal onClose={modalCloseHandler} content={<LoginForm isLogin={isLogin}/>}/>}
            {isModalOpen && isLogup && <Modal onClose={modalCloseHandler} content={<LoginForm isLogin={isLogin}/>}/>}
        </div>
    )
}

export default Header;