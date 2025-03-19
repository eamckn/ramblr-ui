import { useParams } from "react-router-dom"

const Post = () => {

    const { postId } = useParams();

    return (
        <>
            <h1>Post {postId} can be found here</h1>
        </>
    )
}

export default Post