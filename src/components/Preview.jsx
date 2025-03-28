import { Link } from "react-router-dom"

const Preview = ({ id, title, timestamp, commentCount }) => {

    return (
        <div className="preview">
            <Link to={'/posts/' + id}>
                <h1 className="title row1">{title}</h1>
                <p className="content row2"></p>
                <div className="row3">
                    <p className="date-posted">Posted at {timestamp}</p>
                    <p className="comment-count">{commentCount} comments</p>
                </div>
            </Link>
        </div>
    )

}

export default Preview