import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import costumers from '../styles/Klanten.module.css'

function Mail() {
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
            <p className={styles.link_item}><Link href="/">Overzicht</Link></p>
            <p className={styles.link_item}><Link href="/klanten">Klanten</Link></p>
            <p className={styles.link_item}><Link href="/mail">Mail</Link></p>
          </div>
        </div>
        <div className={costumers.dashboard}>
          <div className={costumers.header}>
            <h1>Mail</h1>
            <div className={costumers.header_search}>
              <p>Search</p>
              {/* Here comes input field */}
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

export default Mail