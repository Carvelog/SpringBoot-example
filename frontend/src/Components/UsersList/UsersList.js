import { useEffect, useState } from "react"

import userService from '../../services/userService'
import Section from "../UI/Section/Section"
import styles from './UsersList.module.css'


const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await userService.getUsers()
            setUsers(response)
          };
        
          fetchData();
        
    }, [])

    return(
        <Section className={styles.section}>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Creation date</th>
                            <th>Roles</th>
                        </tr>
                        {users.length > 0 && users.map((user, pi) => { 
                            return ( 
                                <tr key={pi}>
                                    <td>{user.username}</td>
                                    <td>{user.creationDate}</td>
                                    <td>{user.roles.map((role, i) => { return <span key={pi+''+i}>{role.toLowerCase()} </span>})}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Section>
    )
}


export default UsersList