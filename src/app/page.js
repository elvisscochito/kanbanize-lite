/* import Image from 'next/image' */
import styles from './page.module.css'
import LinkButton from './components/LinkButton'

export default function Home () {
  return (
    <main className={styles.main}>
      <h1>Kanbanize Lite</h1>
      <LinkButton href='/log-in' text='Log In' />
      <LinkButton href='/sign-up' text='Sign up' />
    </main>
  )
}
