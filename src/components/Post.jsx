import { useContext } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom"
import Comment from "./Comment";
import AuthContext from "../contexts/authContext";

const Post = () => {

    const { postId } = useParams();
    const [ data ] = useOutletContext()
    const { user } = useContext(AuthContext)

    const postData = data.find(post => 
            post.id === Number(postId)
    )
        
    return (
        <>
            <h1>Post {postId} can be found here</h1>
            {postData.comments.map(comment => {
                return <Comment key={comment.id} content={comment.content} timestamp={comment.postedAt} />
            })}
            {user ? (
                <div id="new-comment">
                    <label htmlFor="content">Add a new comment below: </label>
                    <textarea id="content"></textarea>
                </div>
            ) : (
                    <div id="no-user"><b>Sign in</b> to leave a comment</div>
            )}
            <Link to='/'><h2>Go back to home <i>here</i></h2></Link>
        </>
    )
}

export default Post