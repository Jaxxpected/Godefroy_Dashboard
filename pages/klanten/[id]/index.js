import { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import InputMask from "react-input-mask"

import styles from '../../../styles/Home.module.css'
import customers from '../../../styles/Klanten.module.css'
import add from '../../../styles/Add.module.css'

import { GraphQLClient } from 'graphql-request'
import { gql, useMutation } from '@apollo/client';

const graph = new GraphQLClient(
  "https://godefroy-api.herokuapp.com/"
);


function Klantendetail({ customer }) {

  const customerId = JSON.stringify(customer.id);

  const UPDATE_CUSTOMER = gql`
  mutation updateCustomer ($name: String, $plate: String){
    updateCustomer(customerId: ${customerId},
      customer: {
      name: $name,
      plate: $plate,
      }){id}
    }
  `;

  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [updateCustomer, updatedCustomer] = useMutation(UPDATE_CUSTOMER);

  const [showSummer, setSummer] = useState("false");
  const handleToggle = () => {
    setSummer(!showSummer);
  };

  useEffect(() => {
    if (updatedCustomer) {
    }
  }, [updatedCustomer]);

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
          </div>
        </div>
        <div className={customers.dashboard}>
          <form onSubmit={e => {
            e.preventDefault();
            updateCustomer({ variables: { name: name, plate: plate } })
          }}>
            <div className={customers.header}>
              <input className={add.name} type="text" name="name" defaultValue={customer.name} onChange={e => setName(e.target.value)} />
              <button className={add.submit} type="submit" value="Submit">Opslaan</button>
            </div>
            <div className={add.box}>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Nummerplaat</label>
                <input className={add.box_small_input} type="text" name="plate" defaultValue={customer.plate} onChange={e => setPlate(e.target.value)} />
              </div>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Ligging</label>
                <InputMask className={add.box_small_input} type="text" mask="a9-a9" defaultValue={customer.atelier} />
              </div>
              <div className={add.box_medium}>
                <label className={add.box_small_label}>Taal</label>
                {/* <input className={add.box_small_input} defaultValue={customer.lang} /> */}
                <select className={add.box_small_input}>
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="Nederlands">Nederlands</option>
                  <option value="Frans">Frans</option>
                  <option value="Engels">Engels</option>
                </select>
              </div>
              <div className={add.box_medium}>
                <label className={add.box_small_label}>E-mail</label>
                <input className={add.box_small_input} defaultValue={customer.email} />
              </div>
              <div className={add.box_full}>
                <div className={add.box_full_menu}>
                  <p className={showSummer ? add.box_full_menu_active : ""} onClick={handleToggle}>Zomer</p>
                  <p className={showSummer ? "" : add.box_full_menu_active} onClick={handleToggle}>Winter</p>
                </div>
                <div className={showSummer ? add.box_full_content : add.hidden}>
                  <div className={add.box_full_content_checkbox}>
                    <label className={add.box_small_label}>Profielen</label>
                    <div className={add.box_full_content_options}>
                      <div className={add.box_full_content_checklist}>
                        <label className={add.box_small_checklist_label}>LV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.slv} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="lv" name="lv" value="lv"></input>

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.srv} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="rv" name="rv" value="rv"></input>

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.sla} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="la" name="la" value="la"></input>

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.sra} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="ra" name="ra" value="ra"></input>
                      </div>
                    </div>
                  </div>
                  <div className={add.box_full_content_image}>
                    <Image src="/car.svg" width='300px' height='370px' />
                  </div>
                </div>
                <div className={showSummer ? add.hidden : add.box_full_content}>
                  <div className={add.box_full_content_checkbox}>
                    <label className={add.box_small_label}>Profielen</label>
                    <div className={add.box_full_content_options}>
                      <div className={add.box_full_content_checklist}>
                        <label className={add.box_small_checklist_label}>LV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.wlv} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="lv" name="lv" value="lv"></input>

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.wrv} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="rv" name="rv" value="rv"></input>

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.wla} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="la" name="la" value="la"></input>

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" defaultValue={customer.wra} placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="ra" name="ra" value="ra"></input>
                      </div>
                    </div>
                  </div>
                  <div className={add.box_full_content_image}>
                    <Image src="/car.svg" width='300px' height='370px' />
                  </div>
                </div>
              </div>
              <div className={add.box_mediumplus}>
                <label className={add.box_small_label}>Opmerkingen:</label>
                <textarea placeholder="Typ hier uw opmerking" defaultValue={customer.remark} />
              </div>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Banden</label>
                <div className={add.box_small_checklist}>
                  <label className={add.box_small_checklist_label}>Winter</label>
                  <input className={add.checkbox} type="checkbox" id="winter" name="winter" value="winter"></input>
                  <label className={add.box_small_checklist_label}>Zomer</label>
                  <input className={add.checkbox} type="checkbox" id="summer" name="summer" value="summer"></input>
                </div>
              </div>
              <div className={add.box_small}>
                <p>Kit of band</p>
                <div className={add.box_small_checklist}>
                  <label className={add.box_small_checklist_label}>Kit</label>
                  <input className={add.checkbox} type="checkbox" id="kit" name="kit" value="kit"></input>
                  <label className={add.box_small_checklist_label}>Band</label>
                  <input className={add.checkbox} type="checkbox" id="band" name="band" value="band"></input>
                </div>
              </div>
              <a href={'/klanten/' + customer.id + '/foto'} className={add.box_clickable}>
                <p>Foto's</p>
              </a>
              <div className={add.automatic_mail}>
                <p>Automatische mail</p>
                <div className={add.automatic}>
                  <div className={add.automatic_title}>
                    <p>Groeven</p>
                  </div>
                  <a href="#" className={add.automatic_button}>
                    <p>Verstuur</p>
                  </a>
                </div>
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

export default Klantendetail

export async function getStaticProps({ params }) {
  const { customer } = await graph.request(
    `
    query Customer($id: ID!) {
      customer(id: $id) {
        id
        name
        plate
        atelier
        lang
        email
        remark
        slv
        sla
        srv
        sra
        wlv
        wla
        wrv
        wra
      }
    }
    `, {
    id: params.id
  }
  )
  return {
    props: {
      customer
    }
  }
}

export async function getStaticPaths() {
  const { customers } = await graph.request(
    `
    {
      customers {
        id
      }
    }
    `
  )
  return {
    paths: customers.map(({ id }) => ({
      params: { id }
    })),
    fallback: false
  }
}