import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../contexts/authContext"

const Register = () => {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { register } = useContext(AuthContext)

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

    return (
        <>
            <div id="registration-form">
                <h1>Registration form</h1>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" value={username} onChange={handleUsernameInput} />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={email} onChange={handleEmailInput} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordInput} />
                <button onClick={handleRegistration}>Register</button>
            </div>
            
            <Link to='/'>Back to home page</Link>
        </>
    )

}

export default Register