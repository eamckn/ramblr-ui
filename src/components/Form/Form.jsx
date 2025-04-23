import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../../contexts/authContext"
import FormErrors from "../FormErrors/FormErrors"
import passwordUtils from "../../utils/passwordUtils"
import styles from './Form.module.css'

const Form = ({ type = 'login' }) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginErrors, setLoginErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])

    const { logIn, register } = useContext(AuthContext)

    const navigate = useNavigate()

    const isValidPassword = () => {
        let currentPasswordErrors = []
        if (!passwordUtils.hasNumbers(password)) {
            currentPasswordErrors.push('Your password must contain at least 3 numbers')
        }
        if (!passwordUtils.hasSpecialChar(password)) {
            currentPasswordErrors.push('Your password must contain at least 1 special character')
        }
        if (!passwordUtils.hasUpperCase(password)) {
            currentPasswordErrors.push('Your password must contain at least 1 uppercase letter')
        }
        if (!passwordUtils.hasMinLength(password)) {
            currentPasswordErrors.push('Your password must be at least 8 characters long')
        }
        if (currentPasswordErrors.length === 0) {
            return true
        } else {
            setPasswordErrors([...currentPasswordErrors])
            return false
        }
    }

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
        if (isValidPassword()) {
            const registrationSuccess = await register(email, username, password)
            if (registrationSuccess) {
                navigate('/')
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logInSuccess = await logIn(email, password)
        if (logInSuccess) {
            navigate('/')
        } else {
            setLoginErrors(['The email or password you entered is incorrect. Please try again'])
        }
    }

    return (
        <div className={styles.container}>
            {type === "login" ? (
                <form className={styles.userForm} onSubmit={handleLogin}>
                    <h1 className={styles.formName}>Login</h1>
                    <input className={styles.formInput}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailInput}
                        required />
                    <input className={styles.formInput}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordInput}
                        required />
                    {loginErrors.length > 0 && <FormErrors errors={loginErrors} />}
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
                            onChange={handleUsernameInput}
                            required />
                        <input className={styles.formInput}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailInput}
                            required />
                        <input className={styles.formInput}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordInput}
                            required />
                        {passwordErrors.length > 0 && <FormErrors errors={passwordErrors} />}
                        <button className={styles.formButton} type="submit">Register</button>
                    </form>
            )}
        </div>
    )

}

export default Form