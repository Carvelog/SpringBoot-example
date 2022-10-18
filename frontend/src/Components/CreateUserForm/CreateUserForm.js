import Section from "../UI/Section/Section"
import Button from "../UI/Button/Button"

import styles from './CreateUserForm.module.css'

import userService from '../../services/userService'

const CreateUserForm = () => {

    const createUserHandler = async (e) => {
        e.preventDefault()

        const newUser = {
            username: e.target.username.value,
            password: e.target.password.value,
            roles: [e.target.role.value]
        } 
        
        await userService.saveNewUser(newUser)

        e.target.username.value = ''
        e.target.password.value = ''
        e.target.role.value = ''
    }

    return(
        <Section>
            <div className={styles.header}>
                <h2>Create a new user</h2>
            </div>
            <form className={styles.form} onSubmit={createUserHandler}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" required />
                </div>
                <div>
                    <label>password:</label>
                    <input type="password" name="password" autoComplete="off" required />
                </div>
                <div>
                    <label>Roles:</label>
                    <select name="role" className={styles.select}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <div>
                    <Button className={styles['button-submit']} type="submit">Add user</Button>
                </div>
            </form>
        </Section>
    )
}

export default CreateUserForm