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

        <header className={styles.header}>
            <Link to='/' className={styles.link}>
                <div className={styles.title}>{title}</div>
            </Link>
            <ul className={styles.userOptions}>
                {user ? (
                    <>
                        <li className={styles.userMessage}>Welcome, {user.username}!</li>
                        <li>
                            <button className={styles.logOut} onClick={handleLogOut}>Log out</button>
                        </li>       
                    </>
                ) : (
                        <>
                            <li><Link to='/login'>Log in</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </>
                )}
            </ul>
        </header>

    )

}

export default Header