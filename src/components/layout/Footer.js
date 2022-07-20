import styles from '../styles/Footer.module.css'
import {FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaPinterest} from 'react-icons/fa'

function Footer(){
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li className={styles.item}><FaFacebook /></li>
                <li className={styles.item}><FaWhatsapp /></li>
                <li className={styles.item}><FaInstagram /></li>
                <li className={styles.item}><FaTwitter /></li>
                <li className={styles.item}><FaPinterest /></li>
            </ul>
            <p className={styles.copy_right}>
                <strong>Costs</strong> &copy; 2022
            </p>
        </footer>
    )
}

export default Footer