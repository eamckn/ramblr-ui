import { useOutletContext } from "react-router-dom"
import Preview from "../Preview/Preview"
import styles from './Home.module.css'

const Home = () => {

    const [ postsData ] = useOutletContext()

    return (
        <>
            <h1>Home</h1>
            <div id={styles.previewDisplay}>
                {postsData.map(post => {
                    return <Preview key={post.id} id={post.id} title={post.title} content={post.content} timestamp={post.postedAt} commentCount={post.comments.length} />
                })}
            </div>
        </>
    )
}

export default Home