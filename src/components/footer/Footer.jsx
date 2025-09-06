
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logo from '../../assets/imager/logo.png'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function Footer() {
  const { t, dir, lang } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} style={{ direction: dir }}>
      <div className={styles.footerInner}>
        <div className={styles.top}>
          <div className={styles.grid}>
            <div className={styles.colWide}>
              <div className={styles.brandRow}>
                <Link to="/">
                  <img src={logo} alt="Kashop" className={styles.logo} />
                </Link>
                <div className={styles.brandName}>{lang === 'ar' ? 'كاشوب' : 'Kashop'}</div>
              </div>
              <div className={styles.muted}>{lang === 'ar' ? 'متجرك الموثوق لتجربة تسوّق سلسة ومنتجات مختارة بعناية وعروض رائعة.' : 'Your trusted store for a smooth shopping experience, curated products, and great deals.'}</div>
              <div className={styles.socials}>
                <a href="#" className={styles.socialBtn} aria-label="X">𝕏</a>
                <a href="#" className={styles.socialBtn} aria-label="Instagram">◎</a>
                <a href="#" className={styles.socialBtn} aria-label="Facebook">f</a>
              </div>
            </div>
            <div>
              <div className={styles.colTitle}>{t('footer_store')}</div>
              <ul className={styles.list}>
                <li><Link to="/" className={styles.link}>{t('footer_home')}</Link></li>
                <li><Link to="/cart" className={styles.link}>{t('footer_cart')}</Link></li>
                <li><Link to="/register" className={styles.link}>{t('footer_register')}</Link></li>
                <li><Link to="/login" className={styles.link}>{t('footer_login')}</Link></li>
              </ul>
            </div>
            <div>
              <div className={styles.colTitle}>{t('footer_help')}</div>
              <ul className={styles.list}>
                <li><a href="#" className={styles.link}>{t('footer_faq')}</a></li>
                <li><a href="#" className={styles.link}>{t('footer_returns')}</a></li>
                <li><a href="#" className={styles.link}>{t('footer_shipping')}</a></li>
                <li><a href="#" className={styles.link}>{t('footer_contact')}</a></li>
              </ul>
            </div>
            <div>
              <div className={styles.colTitle}>{t('footer_newsletter')}</div>
              <div className={styles.muted}>{t('footer_subscribe_text')}</div>
              <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
                <input className={styles.input} type="email" placeholder={t('footer_email_placeholder')} required />
                <button type="submit" className={styles.subBtn}>{t('footer_subscribe_btn')}</button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>© {year} {t('footer_all_rights')}</div>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.link}>{t('footer_privacy')}</a>
            <a href="#" className={styles.link}>{t('footer_terms')}</a>
            <a href="#" className={styles.link}>{t('footer_cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
