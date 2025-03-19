import { useParams } from "react-router-dom";

const Comments = () => {

    const { postId } = useParams()

    return (
        <>
            <h1>Comments for post {postId} would be here</h1>
        </>
    )

}

export default Comments