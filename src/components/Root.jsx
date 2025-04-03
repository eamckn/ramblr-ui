import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Header from "./Header";

const Root = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) return <div id="loading">Loading...</div>
    
    if (error) return <div id="error">{error}</div>

    return (
        <>
            <Header title={'Ramblr'} />
            <Outlet context={[data]} />
            <footer id="footer">Footer</footer>
        </>
    )

}

export default Root