import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../../contexts/authContext"
import styles from './Form.module.css'

const Form = ({ type = 'login' }) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { logIn, register } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleEmailInput = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleUsernameInput = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordInput = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleRegistration = async (e) => {
        e.preventDefault()
        const registrationSuccess = await register(email, username, password)
        if (registrationSuccess) {
            navigate('/')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logInSuccess = await logIn(email, password)
        if (logInSuccess) {
            navigate('/')
        } else {
            setEmail('')
            setPassword('')
        }
    }

    return (
        type === "login" ? (
            <form className={styles.userForm} onSubmit={handleLogin}>
                <h1 className={styles.formName}>Login</h1>
                <input className={styles.formInput}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailInput} />
                <input className={styles.formInput}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordInput} />
                <button className={styles.formButton} type="submit">Log in</button>
            </form>
        ) : (
                <form className={styles.userForm} onSubmit={handleRegistration}>
                    <h1 className={styles.formName}>Register</h1>
                    <input className={styles.formInput}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameInput} />
                    <input className={styles.formInput}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailInput} />
                    <input className={styles.formInput}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordInput} />
                    <button className={styles.formButton} type="submit">Register</button>
                </form>
        )
    )

}

export default Form