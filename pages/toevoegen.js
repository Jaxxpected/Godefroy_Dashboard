import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import InputMask from "react-input-mask";
import { gql, useMutation } from '@apollo/client';

import styles from '../styles/Home.module.css'
import customers from '../styles/Klanten.module.css'
import add from '../styles/Add.module.css'

import { useRouter } from 'next/router'

const CREATE = gql`
  mutation addCustomer($name: String!, $plate: String, $atelier: String, $lang: String, $email: String){
    addCustomer(customer: { name: $name, plate: $plate, atelier: $atelier, lang: $lang, email: $email}){
      id
    }
  }
`;

function Toevoegen() {

  const router = useRouter();

  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [atelier, setAtelier] = useState('');
  const [lang, setLang] = useState('');
  const [email, setEmail] = useState('');
  const [remark, setRemark] = useState('');
  const [summerTires, setSummerTires] = useState('');
  const [winterTires, setWinterTires] = useState('');

  const [create, { data }] = useMutation(CREATE);
  useEffect(() => {
    if (data) { console.log(data); }
  }, [data]);

  const [admin, setAdmin] = useState();
  useEffect(() => {
    const admin = localStorage.getItem('admin', admin);
    setAdmin(admin);
  }, [admin]);

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
            <a href="/"><p className={styles.link_item}>Overzicht</p></a>
            <a href="/klanten"><p className={styles["link_item"] + " " + styles["active"]}>Klanten</p></a>
            <a href="/login"><p className={styles.link_item}>Admin login</p></a>
            {admin ?
              <a href="/logout"><p className={styles.link_item}>Logout</p></a>
              : ''}
          </div>
        </div>
        <div className={customers.dashboard}>
          <form onSubmit={e => {
            e.preventDefault();
            create({ variables: { name: name, plate: plate, atelier: atelier, lang: lang, email: email } });
            // router.push('/klanten');
          }}>
            <div className={customers.header}>
              <input className={add.name} placeholder="Naam + Voornaam *" onChange={e => setName(e.target.value)} />
              <button className={add.submit} type="submit" value="Submit">Opslaan</button>
            </div>
            <div className={add.box}>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Nummerplaat *</label>
                <input className={add.box_small_input} placeholder="X-XXX-XXX" onChange={e => setPlate(e.target.value)} />
              </div>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Ligging *</label>
                <InputMask className={add.box_small_input} mask="a9" placeholder="XX" onChange={e => setAtelier(e.target.value)} />
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>Taal *</label>
                <select className={add.box_small_input} onChange={e => setLang(e.target.value)}>
                  <option value="--Option--">--Option--</option>
                  <option value="Nederlands">Nederlands</option>
                  <option value="Frans">Frans</option>
                  <option value="Engels">Engels</option>
                </select>
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>E-mail *</label>
                <input className={add.box_small_input} placeholder="x@gmail.com" onChange={e => setEmail(e.target.value)} />
              </div>

            </div>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2021 - Garage Godefroy x Jaxxpected</p>
      </footer>
    </div>
  )
}

export default Toevoegen