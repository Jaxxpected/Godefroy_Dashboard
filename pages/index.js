import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Godefroy Bandenhotel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navigation}>
          <div className={styles.logo}>
            <Image src="/godefroy.svg" width='185px' height='55px' />
          </div>
          <div className={styles.links}>
            <p className={styles.link_item}>Overzicht</p>
            <p className={styles.link_item}>Klanten</p>
            <p className={styles.link_item}>Mail</p>
          </div>
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboard_info}>
            <div className={styles.dashboard_title}>
              <h1 className={styles.dashboard_title_text}><span>Bandenhotel</span> Godefroy</h1>
            </div>
            <div className={styles.dashboard_sloganbox}>
              <p className={styles.dashboard_slogan}>Collect the wheels and control your garage online</p>
              <Image src="/slogan.svg" width='350px' height='350px' />
            </div>
          </div>
          <div className={styles.dashboard_data}>
            <p className={styles.dashboard_user}>Alec M.</p>
            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Klanten</p>
              <p className={styles.dashboard_user_data_input}>312</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2021 - Garage Godefroy x Jaxxpected</p>
      </footer>
    </div>
  )
}
