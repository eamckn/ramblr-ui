import { Link, useOutletContext } from "react-router-dom"
import Preview from "./Preview"
import AuthContext from "../contexts/authContext"

const Home = () => {

    const [data] = useOutletContext()

    return (
        <>
            <h1>Home page</h1>
            <h2>Blog post previews below:</h2>
            {data.map(post => {
                return <Preview key={post.id} id={post.id} title={post.title} timestamp={post.postedAt} commentCount={post.comments.length} />
            })}
        </>
    )
}

export default Home