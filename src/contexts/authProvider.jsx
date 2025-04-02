import { useState, useEffect} from "react";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        verifyToken()
    }, [])
    const verifyToken = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const authHeader = 'Bearer ' + token;
            const response = await fetch('http://localhost:8080/verify', {
                headers: {
                    'Authorization': `${authHeader}`
                }
            })
            if (response.ok) {
                const json = await response.json()
                // That user is then stored in state as user
                setUser(json.user)
            } else {
                // user is null, done loading (?)
            }
        }
    }

    const register = async (email, username, password) => {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        })
        if (response.ok) {
            const json = await response.json()
            const token = json.token
            localStorage.setItem('token', token)
            verifyToken()
            return true
        }
    }

    const logIn = async (email, password) => {
        const response = await fetch('http://localhost:8080/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const json = await response.json()
            const token = json.token
            localStorage.setItem('token', token)
            verifyToken()
            return true
        }
    }

    const logOut = async () => {
        const response = await fetch('http://localhost:8080/log-out')
        if (response.ok) {
            setUser(null)
            localStorage.removeItem('token')
        }
    }

    return (
        <AuthContext.Provider value={{ user, register, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthProvider