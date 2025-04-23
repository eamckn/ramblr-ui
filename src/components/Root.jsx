import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ServerError from "./ServerError/ServerError";

const Root = () => {

    const [postsData, setPostsData] = useState([])
    const [postsLoading, setPostsLoading] = useState(true)
    const [postsError, setPostsError] = useState(null)

    const { authLoading, authError } = useContext(AuthContext)

    const serverError = authError || postsError;
    const loading = authLoading || postsLoading;

    const getData = async () => {
            setPostsLoading(true)
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

    useEffect(() => {
        // Simulate network latency
        setTimeout(() => {
            getData()
        }, 2000);
    }, [])

    return (
        <>
            <Header title={'Ramblr'} />
            <div id="main">
                {loading ? (
                    <div className='loader'></div>
                ) : (
                        (serverError)  ? (
                            <ServerError error={serverError}/>
                        ) : (
                                <Outlet context={{ postsData, getData }} />
                        )
                )}
            </div>
            <Footer />
        </>
    )

}

export default Root