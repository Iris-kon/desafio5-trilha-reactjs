import styles from './header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Link href={"/"}>
       <img className={styles.logo} src="/images/logo.svg" alt="logo"/>
      </Link>
    </div>
  )
}
