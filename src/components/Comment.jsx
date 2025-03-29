
const Comment = ({ content, timestamp }) => {

    return (
        <div className="comment">
            <p>{content}</p>
            <p><i>Posted at {timestamp}</i></p>
        </div>
    )

}

export default Comment