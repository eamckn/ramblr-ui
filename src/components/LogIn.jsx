import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const LogIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleEmailInput = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        const response = await (await fetch('http://localhost:8080/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })).json()
        if (response.statusCode === 200) {
            localStorage.setItem('token', response.token)
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