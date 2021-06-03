import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import customer from '../../styles/Klanten.module.css'
import load from '../../styles/Load.module.css'

import { GraphQLClient } from 'graphql-request'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export async function getStaticProps() {
  const graph = new GraphQLClient(
    "https://godefroy-api.herokuapp.com/"
  );

  const { customers } = await graph.request(
    `
    {
      customers {
        id
        name
        plate
        lang
        atelier
        email
      }
    }
    `
  );
  return {
    props: {
      customers,
    }
  }
}

function Klanten({ customers }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Godefroy Bandenhotel | Klanten</title>
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
            <a href="/klanten"><p className={styles["link_item"] + " " + styles["active"]}>Klanten</p></a>
          </div>
        </div>
        <div className={customer.dashboard}>
          <div className={customer.header}>
            <h1>Klantenlijst</h1>
            <div>
              <a href='/toevoegen' className={customer.header_add}><FontAwesomeIcon icon={faPlus} /></a>
              <div className={customer.header_search}>
                <p>Search</p>
              </div>
            </div>
          </div>
          <div className={customer.clients}>
            <div className={customer.filter}>
              <p className={customer.filter_name}>Naam</p>
              <p className={customer.filter_plate}>Nummerplaat</p>
              <p className={customer.filter_lang}>Taal</p>
              <p className={customer.filter_atelier}>Plaats</p>
              <p className={customer.filter_email}>E-mail</p>
              <p className={customer.filter_foto}>Foto's</p>
            </div>
            {customers.map(({ id, name, plate, lang, atelier, email }) => (
              <Link href={'/klanten/' + id} key={id} >
                <div className={customer.client}>
                  <p className={customer.client_name}>{name}</p>
                  <p className={customer.client_plate}>{plate}</p>
                  <p className={customer.lang}>{lang}</p>
                  <p className={customer.atelier}>{atelier}</p>
                  <p className={customer.email}>{email}</p>
                  <Link className={customer.foto} href={'/klanten/' + id + '/foto'}>Foto's bekijken</Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2021 - Garage Godefroy x Jaxxpected</p>
      </footer>
    </div>
  )
}

export default Klanten