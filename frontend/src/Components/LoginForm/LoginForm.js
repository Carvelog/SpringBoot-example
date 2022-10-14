import { useState } from "react"

import styles from './Forms.module.css'
import Button from "../UI/Button/Button"

import { useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"

import { modalActions } from "../../store/modal"
import { authActions } from '../../store/auth'

import AuthService from "../../services/authService"

const postSubmitUserData = async (username, password, isLogin) => {
    return isLogin ? AuthService.login(username, password) : AuthService.logup(username, password)
}

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmitHandler = (e) => {
        e.preventDefault()
    
        postSubmitUserData(username, password, props.isLogin)

        setUsername('')
        setPassword('')
        
        dispatch(authActions.signin())
        dispatch(modalActions.closeModal())

        navigate('/items')
    }
      
    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }
    
    const passwordeHandler = (e) => {
        setPassword(e.target.value)
    }

    return (
        <form className={styles.userForm} onSubmit={onSubmitHandler}>
            <input placeholder="Username" type="text" name="username" value={username} onChange={usernameHandler} />
            <input placeholder="Password" type="password" name="password" value={password} onChange={passwordeHandler}/>
            <Button type='submit' className={styles.submitButton}>Log in</Button>
        </form>
    )
}

export default LoginForm