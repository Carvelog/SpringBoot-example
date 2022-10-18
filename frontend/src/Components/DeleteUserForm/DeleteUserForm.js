import Button from "../UI/Button/Button"
import Section from "../UI/Section/Section"

import userService from '../../services/userService'

import styles from './DeleteUserForm.module.css'

const DeleteUserForm = () => {

    const deleteUserHandler = (e) => {
        e.preventDefault()

        userService.deleteUser(e.target.username.value)

        e.target.username.value = ''
    }

    return(
        <Section>
            <div className={styles.header}>
                <h2>Delete a new user</h2>
            </div>
            <form className={styles.form} onSubmit={deleteUserHandler}>
                <div>
                    <label>Username</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <Button className={styles['button-submit']} type="submit">Delete</Button>
                </div>
            </form>
        </Section>
    )
}

export default DeleteUserForm