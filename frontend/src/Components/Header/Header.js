import style from './Header.module.css'

import Button from '../UI/Button/Button'

const Header = () => {

    const signinHandler = () => {
        // open modal con sign in form
        console.log('open modal')
    }

    return (
        <div className={style.header}>
            <div className={style['sign-buttons-container']}>
                <Button onClick={signinHandler}>Sign in</Button>
                <Button>Sign up</Button>
            </div>
        </div>
    )
}

export default Header;