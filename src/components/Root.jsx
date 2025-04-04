import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Root = () => {

    const [postsData, setPostsData] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState(null)

    const { authLoading, authError } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/posts')
                if (response.status >= 500) {
                    throw new Error('Server error')
                }
                const json = await response.json()
                setPostsData(json)
            } catch (error) {
                setPostsError(error)
            } finally {
                setPostsLoading(false)
            }
        }
        getData()
    }, [])

    if (authLoading) return <div id="loading">Loading...</div>
    
    if (authError) return <div id="error">{authError.message}</div>

    return (
        <>
            <Header title={'Ramblr'} />
            <div id="main">
                {postsLoading ? (
                    <div id="loading">Loading...</div>
                ) : (
                        postsError ? (
                            <div id="error">{postsError.message}</div>
                        ) : (
                                <Outlet context={[ postsData ]} />
                        )
                )}
            </div>
            <Footer />
        </>
    )

}

export default Root