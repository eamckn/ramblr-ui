import { useState, useContext } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';
import styles from './NewComment.module.css'

const base_url = import.meta.env.VITE_API_BASE_URL

const NewComment = () => {

    const [content, setContent] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState(null)

    const { postId } = useParams()
    const { getData } = useOutletContext()
    const { user } = useContext(AuthContext)

    const handleCommentInput = (e) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleCommentSubmit = async (e) => {
        try {
            e.preventDefault()
            setSubmitting(true)
            const token = localStorage.getItem('ramblrUserToken')
            const response = await fetch(`${base_url}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ content, userId: user.id })
            })
            if (!response.ok) {
                setSubmitError(new Error('Server error'))
            } else {
                getData()
            }
        } catch (error) {
            setSubmitError(error)
        } finally {
            setSubmitting(false)
        }
    }

    if (submitting) return <div className={styles.submitting}>Sending comment...</div>

    return (
        <>
            <form onSubmit={handleCommentSubmit} className={styles.newComment}>
                <textarea className={styles.commentInput}
                    rows='5'
                    onChange={handleCommentInput}
                    value={content}
                    placeholder='Add a new comment'
                    required />
                <button className={styles.commentButton} type='submit'>Post</button>
            </form>
            {submitError &&
                <div className={styles.submitError}>
                    There was an error trying to submit your comment. Please try again.
                </div>}
        </>
    )
    
}

export default NewComment