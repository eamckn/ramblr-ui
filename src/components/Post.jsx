import { useParams, Link } from "react-router-dom"

const Post = ({ data }) => {

    const { postId } = useParams();

    const postData = data.filter(post => 
            post.id === Number(postId)
    )
    
    console.log(postData)
    
    return (
        <>
            <h1>Post {postId} can be found here</h1>
            <Link to='/'><h2>Go back to home <i>here</i></h2></Link>
        </>
    )
}

export default Post