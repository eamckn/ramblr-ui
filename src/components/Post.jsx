import { useParams, Link } from "react-router-dom"

const Post = () => {

    const { postId } = useParams();

    return (
        <>
            <h1>Post {postId} can be found here</h1>
            <Link to='/'><h2>Go back to home <i>here</i></h2></Link>
        </>
    )
}

export default Post