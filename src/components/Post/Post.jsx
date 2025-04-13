import { useContext } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom"
import Comment from "../Comment/Comment";
import NewComment from "../NewComment/NewComment";
import AuthContext from "../../contexts/authContext";
import styles from './Post.module.css'

const Post = () => {

    const { postId } = useParams();
    const { postsData } = useOutletContext()
    const { user } = useContext(AuthContext)

    const postData = postsData.find(post => 
            post.id === Number(postId)
    )
        
    return (
        <div className={styles.postComments}>
            <div className={styles.post}>
                <h1 className={styles.title}>{postData.title}</h1>
                <p className={styles.content}>{postData.content}</p>
            </div>
            <div className={styles.commentSection}>
                {postData.comments.map((comment, index) => {
                    return <Comment key={comment.id}
                        content={comment.content}
                        timestamp={comment.postedAt}
                        user={comment.user}
                        animationOrder={index + 1} />
                })}
                {user ? (
                    <NewComment />
                ) : (
                        <div className={styles.noUser}>
                            <Link to='/login'><b>Sign in</b></Link> to leave a comment
                        </div>
                )}
            </div>
        </div>
    )
}

export default Post