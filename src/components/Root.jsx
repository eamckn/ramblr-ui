import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Header from "./Header";

const Root = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { authLoading, authError } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/posts')
                if (response.status >= 500) {
                    throw new Error('Server error')
                }
                const json = await response.json()
                setData(json)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    if (authLoading) return <div id="loading">Loading...</div>
    
    if (authError) return <div id="error">{authError.message}</div>

    return (
        <>
            <Header title={'Ramblr'} />
            {loading ? (
                <div id="loading">Loading...</div>
            ) : (
                    error ? (
                        <div id="error">{error.message}</div>
                    ) : (
                            <Outlet context={[data]} />
                    )
            )}
            <footer id="footer">Footer</footer>
        </>
    )

}

export default Root