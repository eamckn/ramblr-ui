import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../contexts/authContext"

const LogIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { logIn } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleEmailInput = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
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
        <>
            <div id="login-form">
                <h1>Log-in form</h1>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" value={email} onChange={handleEmailInput} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordInput} />
                <button onClick={handleLogin}>Log in</button>
            </div>
            
            <Link to='/'>Back to home page</Link>
        </>
    )

}

export default LogIn