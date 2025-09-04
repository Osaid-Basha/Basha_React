
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/imager/logo.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.top}>
          <div className={styles.grid}>
            <div className={styles.colWide}>
              <div className={styles.brandRow}>
                <Link to="/">
                  <img src={logo} alt="Kashop" className={styles.logo} />
                </Link>
                <div className={styles.brandName}>Basha</div>
              </div>
              <div className={styles.muted}>Your trusted store for a smooth shopping experience, curated products, and great deals.</div>
              <div className={styles.socials}>
                <a href="#" className={styles.socialBtn} aria-label="Twitter">𝕏</a>
                <a href="#" className={styles.socialBtn} aria-label="Instagram">◎</a>
                <a href="#" className={styles.socialBtn} aria-label="Facebook">f</a>
              </div>
            </div>
            <div>
              <div className={styles.colTitle}>Shop</div>
              <ul className={styles.list}>
                <li><Link to="/" className={styles.link}>Home</Link></li>
                <li><Link to="/cart" className={styles.link}>Cart</Link></li>
                <li><Link to="/register" className={styles.link}>Register</Link></li>
                <li><Link to="/login" className={styles.link}>Login</Link></li>
              </ul>
            </div>
            <div>
              <div className={styles.colTitle}>Help</div>
              <ul className={styles.list}>
                <li><a href="#" className={styles.link}>FAQ</a></li>
                <li><a href="#" className={styles.link}>Returns</a></li>
                <li><a href="#" className={styles.link}>Shipping</a></li>
                <li><a href="#" className={styles.link}>Contact</a></li>
              </ul>
            </div>
            <div>
              <div className={styles.colTitle}>Newsletter</div>
              <div className={styles.muted}>Subscribe to get the latest updates and offers.</div>
              <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
                <input className={styles.input} type="email" placeholder="Your email address" required />
                <button type="submit" className={styles.subBtn}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>© {year} Bashal rights reserved.</div>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.link}>Privacy</a>
            <a href="#" className={styles.link}>Terms</a>
            <a href="#" className={styles.link}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
