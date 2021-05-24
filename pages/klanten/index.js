import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import customers from '../../styles/Klanten.module.css'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Customers {
    customers {
      id
      name
      plate
      lang
      atelier
      email
    }
  }
`;

function Klanten() {

  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    console.error(error);
    return null;
  }

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
            <p className={styles.link_item}><Link href="/overzicht">Overzicht</Link></p>
            <a href="/klanten"><p className={styles["link_item"] + " " + styles["active"]}>Klanten</p></a>
            <p className={styles.link_item}><Link href="/mail">Mail</Link></p>
          </div>
        </div>
        <div className={customers.dashboard}>
          <div className={customers.header}>
            <h1>Klantenlijst</h1>
            <div>
              <a href='/toevoegen' className={customers.header_add}><FontAwesomeIcon icon={faPlus} /></a>
              <div className={customers.header_search}>
                <p>Search</p>
                {/* Here comes input field */}
              </div>
            </div>
          </div>
          <div className={customers.clients}>
            <div className={customers.filter}>
              <p className={customers.filter_name}>Naam</p>
              <p className={customers.filter_plate}>Nummerplaat</p>
              <p className={customers.filter_lang}>Taal</p>
              <p className={customers.filter_atelier}>Plaats</p>
              <p className={customers.filter_email}>E-mail</p>
            </div>
            {data.customers.map(costumer => (
              <Link href={'/klanten/' + costumer.id} >
                <div className={customers.client} key={costumer.name}>
                  <p className={customers.client_name}>{costumer.name}</p>
                  <p className={customers.client_plate}>{costumer.plate}</p>
                  <p className={customers.lang}>{costumer.lang}</p>
                  <p className={customers.atelier}>{costumer.atelier}</p>
                  <p className={customers.email}>{costumer.email}</p>
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