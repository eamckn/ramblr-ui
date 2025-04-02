import { Link, useOutletContext } from "react-router-dom"
import Preview from "./Preview"
import { useContext } from "react"
import AuthContext from "../contexts/authContext"

const Home = () => {

    const [data] = useOutletContext()

    const { logOut } = useContext(AuthContext)

    const handleLogOut = (e) => {
        e.preventDefault()
        logOut()
    }

    return (
        <>
            <h1>Home page</h1>
            <h2>Blog post previews below:</h2>
            {data.map(post => {
                return <Preview key={post.id} id={post.id} title={post.title} timestamp={post.postedAt} commentCount={post.comments.length} />
            })}
            <Link to='/login'><h3>Click here to log in</h3></Link>
            <Link to='/register'><h3>Click here to register</h3></Link>
            <button onClick={handleLogOut}>Log out</button>
        </>
    )
}

export default Home