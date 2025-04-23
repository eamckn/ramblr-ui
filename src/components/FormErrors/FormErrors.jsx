import styles from './FormErrors.module.css'

const FormError = ({ errors }) => {

    return (

        <ul className={styles.formErrors}>
            {errors.map(error => {
                return <li className={styles.error} key={error}>{error}</li>
            })}
        </ul>

    )

}

export default FormError