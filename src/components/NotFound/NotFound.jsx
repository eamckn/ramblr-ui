import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.frown}>{':('}</h1>
            <h1>404 Error: Page not found</h1>
            <h2>We're sorry, but it looks like that page doesn't exist.</h2>
            <section>Please click <Link to={'/'} className={styles.linkHome}>here</Link> to go back to the home page</section>
        </div>
)

}

export default NotFound