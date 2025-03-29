import { Link, useParams, useOutletContext } from "react-router-dom"
import Comment from "./Comment";

const Post = () => {

    const { postId } = useParams();
    const [ data ] = useOutletContext()

    //console.log(data)

    const postData = data.find(post => 
            post.id === Number(postId)
    )
    
    //console.log(postData)
    
    return (
        <>
            <h1>Post {postId} can be found here</h1>
            {postData.comments.map(comment => {
                return <Comment key={comment.id} content={comment.content} timestamp={comment.postedAt} />
            })}
            <Link to='/'><h2>Go back to home <i>here</i></h2></Link>
        </>
    )
}

export default Post