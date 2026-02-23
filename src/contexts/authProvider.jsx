import { useState, useEffect} from "react";
import AuthContext from "./authContext";

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        verifyToken()
    }, [])

    const verifyToken = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const authHeader = 'Bearer ' + token;
                const response = await fetch('http://localhost:3000/verify', {
                    headers: {
                        'Authorization': `${authHeader}`
                    }
                })
                if (response.ok) {
                    const json = await response.json()
                    setUser(json.user)
                } else {
                    setUser(null)
                    console.error(`Invalid JWT value retreived from key 'token' in localStorage. Please try logging in again to receive a new token.`)
                }
            }
        } catch (error) {
            setAuthError(error)
        } finally {
            setAuthLoading(false)
        }
    }

    const register = async (email, username, password) => {
        try {
            const response = await fetch('http://localhost:3000/register', {
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
            } else {
                console.error('Error registering user. Please try again.')
            }
        } catch (error) {
            setAuthError(error)
        }
    }

    const logIn = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/log-in', {
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
            } else {
                // This should be probably be displayed onscreen
                console.error('Invalid user credentials. Please try again.')
            }
        } catch (error) {
            setAuthError(error)
        }
    }

    const logOut = async () => {
        try {
            const token = localStorage.getItem('token')
            const authHeader = 'Bearer ' + token;
            const response = await fetch('http://localhost:3000/log-out', {
                method: 'POST',
                headers: {
                        'Authorization': `${authHeader}`
                    },
            })
            if (response.ok) {
                setUser(null)
                localStorage.removeItem('token')
            } else {
                console.error('Logout unsuccessful due to unexpected server error. Please try again.')
            }
        } catch (error) {
            setAuthError(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            authLoading,
            authError,
            register,
            logIn,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthProvider