import styles from './AdminDashboard.module.css'

import CreateUserForm from '../../Components/CreateUserForm/CreateUserForm'
import DeleteUserForm from '../../Components/DeleteUserForm/DeleteUserForm'
import UsersList from '../../Components/UsersList/UsersList'

import Button from '../../Components/UI/Button/Button'
import { useState } from 'react'

const AdminDashboard = () => {
    const [showCreateUserForm, setShowCreateUserForm] = useState(false)
    const [showDeleteUserForm, setShowDeleteUserForm] = useState(false)
    const [showUserList, setShowUserList] = useState(false)

    const createUserHanlder = () => {
        setShowCreateUserForm(true)
        setShowDeleteUserForm(false)
        setShowUserList(false)
    }

    const deleteUserHanlder = () => {
        setShowCreateUserForm(false)
        setShowDeleteUserForm(true)
        setShowUserList(false)
    }

    const listUsersHanlder = () => {
        setShowCreateUserForm(false)
        setShowDeleteUserForm(false)
        setShowUserList(true)
    }

    return(
        <div className={styles.dashboard}>
            <section className={styles['sidebar-menu']}>
                <Button onClick={createUserHanlder}>Create user</Button>
                <Button onClick={deleteUserHanlder}>Delete user</Button>
                <Button onClick={listUsersHanlder}>List users</Button>
            </section>
            <section className={styles['main-content']}>
                {showCreateUserForm && <CreateUserForm />}
                {showDeleteUserForm && <DeleteUserForm />}
                {showUserList && <UsersList />}
            </section>
        </div>
    )
}

export default AdminDashboard