import { useOutletContext } from "react-router-dom"
import Preview from "./Preview"

const Home = () => {

    const [ postsData ] = useOutletContext()

    return (
        <>
            <h1>Home page</h1>
            <h2>Blog post previews below:</h2>
            {postsData.map(post => {
                return <Preview key={post.id} id={post.id} title={post.title} timestamp={post.postedAt} commentCount={post.comments.length} />
            })}
        </>
    )
}

export default Home