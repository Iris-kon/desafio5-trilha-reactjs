import styles from './header.module.scss'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.logo} src="/images/logo.svg" alt="logo"/>
    </div>
  )
}
