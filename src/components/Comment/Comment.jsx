import { formatDate, formatTime } from '../../utils/formatTimestamp'
import styles from './Comment.module.css'

const Comment = ({ content, timestamp, user, animationOrder }) => {

    return (
        <div className={styles.comment} style={{ '--animation-order': `${animationOrder}`}}>
            <div className={styles.info}>
                <h3>{user.username}</h3>
                <p><i>{formatDate(timestamp)} at {formatTime(timestamp)}</i></p>
            </div>
            <p className={styles.content}>{content}</p>
        </div>
    )

}

export default Comment