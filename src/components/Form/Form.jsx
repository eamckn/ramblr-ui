import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../../contexts/authContext"
import FormErrors from "../FormErrors/FormErrors"
import getPasswordErrors from "../../utils/passwordUtils"
import styles from './Form.module.css'

const Form = ({ submitType, name, buttonName }) => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([])

    const { logIn, register } = useContext(AuthContext)

    const navigate = useNavigate()

    const isValidPassword = () => {
        const passwordErrors = getPasswordErrors(password)
        if (passwordErrors.length === 0) {
            return true
        } else {
            setErrors([...passwordErrors])
            return false
        }
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        switch (submitType) {
            // REGISTER
            case 'register':
                e.preventDefault()
                if (isValidPassword()) {
                    if (await register(email, username, password)) {
                        navigate('/')
                    } else {
                        setErrors(['There was an error registering you. Please try again.'])
                    }
                }
                break
            // LOGIN
            case 'login':
            default:
                if (await logIn(email, password)) {
                    navigate('/')
                    break
                } else {
                    setErrors(['The email or password you entered is incorrect. Please try again'])
                    break
                }
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.userForm} onSubmit={handleSubmit}>
                <h1 className={styles.formName}>{name}</h1>
                {submitType == 'register' && 
                    <input className={styles.formInput}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameInput}
                        required />
                }
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
                {errors.length > 0 && <FormErrors errors={errors} />}
                <button className={styles.formButton} type="submit">{buttonName}</button>
            </form>
        </div>
    )

}

export default Form