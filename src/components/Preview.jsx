const Preview = ({ title, timestamp }) => {

    return (
        <div className="preview">
            <h1 className="title row1"></h1>
            <p className="content row2"></p>
            <div className="row3">
                <p className="date-posted"></p>
                <p className="comment-count"></p>
            </div>
        </div>
    )

}

export default Preview