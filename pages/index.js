import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import load from '../styles/Load.module.css'
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Customers {
    customers {
      name
      plate
      email
      summerTires
      winterTires
    }
  }
`;

export default function Home() {

  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return <div className={load.loading}><div><Image className={load.image} src="/loading.svg" width='350px' height='350px' /><h2>Loading...</h2></div></div>;
  }
  if (error) {
    console.error(error);
    return null;
  }

  // Start count
  const collect = require('collect.js');
  const num = data.customers;
  const all = collect(num);
  const total = all.count();
  // End count

  // Start count summer tires
  let sumTires = data.customers.reduce(function (accumulator, data) {
    return accumulator + data.summerTires
  }, 0)
  // End count tires

  // Start count winter tires
  let winTires = data.customers.reduce(function (accumulator, data) {
    return accumulator + data.winterTires
  }, 0)
  // End count tires

  // Start count all tires
  const atelier = sumTires + winTires

  const s = (sumTires / atelier) * 100
  const spro = s.toFixed(0)

  const w = (winTires / atelier) * 100
  const wpro = w.toFixed(0)
  // End count all tires

  // Start capaciteit
  const tires = (atelier / 1240) * 100
  const cap = tires.toFixed(1)
  // End capaciteit

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
            <a href="/"><p className={styles["link_item"] + " " + styles["active"]}>Overzicht</p></a>
            <a href="/klanten"><p className={styles.link_item}>Klanten</p></a>
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
            <p className={styles.dashboard_user}>Werknemer</p>

            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Klanten</p>
              <p className={styles.dashboard_user_data_input}>{total}</p>
            </div>

            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Aantal banden</p>
              <p className={styles.dashboard_user_data_input}>{atelier}</p>
            </div>

            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Zomerbanden</p>
              <div className={styles.dashboard_user_data_status}>
                <div className={styles.dashboard_user_data_status_bar}>
                  <div style={{ width: spro + '%', backgroundColor: '#E9C46A' }}></div>
                </div>
                <div className={styles.dashboard_user_data_status_data}>
                  <p>{spro}%</p>
                </div>
              </div>
            </div>

            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Winterbanden</p>
              <div className={styles.dashboard_user_data_status}>
                <div className={styles.dashboard_user_data_status_bar}>
                  <div style={{ width: wpro + '%', backgroundColor: '#E9C46A' }}></div>
                </div>
                <div className={styles.dashboard_user_data_status_data}>
                  <p>{wpro}%</p>
                </div>
              </div>
            </div>

            <div className={styles.dashboard_user_data}>
              <p className={styles.dashboard_user_data_title}>Capaciteit atelier</p>
              <div className={styles.dashboard_user_data_status}>
                <div className={styles.dashboard_user_data_status_bar}>
                  <div style={{ width: cap + '%', backgroundColor: '#264653' }}></div>
                </div>
                <div className={styles.dashboard_user_data_status_data}>
                  <p>{cap}%</p>
                </div>
              </div>
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