import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../contexts/authContext"

const Header = ({ title }) => {

    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = (e) => {
        e.preventDefault()
        logOut()
    }

    return (

        <header id="header">
            <div id="title">
                {title}
            </div>
            {user ? (
                <div id="logged-in">
                    <div id="message">Welcome {user.username}</div>
                    <button onClick={handleLogOut}>Log out</button>
                </div>        
            ) : (
                <ul id="logged-out">
                    <li><Link to='/login'>Click here to log in</Link></li>
                    <li><Link to='/register'>Click here to register</Link></li>
                </ul>
            )}
        </header>

    )

}

export default Header