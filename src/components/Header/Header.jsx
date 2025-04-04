import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../contexts/authContext"
import styles from './Header.module.css'

const Header = ({ title }) => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = (e) => {
        e.preventDefault()
        logOut()
    }

    return (

        <header id={styles.header}>
            <div className={styles.title}>
                <Link to='/'>{title}</Link>
            </div>
            {user ? (
                <ul className={styles.userOptions}>
                    <li className={styles.userMessage}>Welcome, {user.username}!</li>
                    <li><button className={styles.logOut} onClick={handleLogOut}>Log out</button></li>
                </ul>        
            ) : (
                <ul className={styles.userOptions}>
                    <li><Link to='/login'>Log in</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            )}
        </header>

    )

}

export default Header