import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import InputMask from "react-input-mask";

import styles from '../../../styles/Home.module.css'
import customers from '../../../styles/Klanten.module.css'
import add from '../../../styles/Add.module.css'

import { getAll, getById } from "../klanten/customer.service";

function Klantendetail({ customer }) {

  const [showSummer, setSummer] = useState("false");
  const handleToggle = () => {
    setSummer(!showSummer);
  };

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
            <a href="/overzicht"><p className={styles.link_item}>Overzicht</p></a>
            <a href="/klanten"><p className={styles["link_item"] + " " + styles["active"]}>Klanten</p></a>
            <a href="/mail"><p className={styles.link_item}>Mail</p></a>
          </div>
        </div>
        <div className={customers.dashboard}>
          <form>
            <div className={customers.header}>
              <input className={add.name} placeholder={customer.name} />
              <button className={add.submit} type="submit">Opslaan</button>
            </div>
            <div className={add.box}>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Nummerplaat</label>
                <input className={add.box_small_input} placeholder="X-XXX-XXX" />
              </div>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Ligging</label>
                <InputMask className={add.box_small_input} mask="a9-a9" placeholder="XX-XX" />
              </div>
              <div className={add.box_medium}>
                <label className={add.box_small_label}>Taal</label>
                <input className={add.box_small_input} placeholder="Taal" />
              </div>
              <div className={add.box_medium}>
                <label className={add.box_small_label}>E-mail</label>
                <input className={add.box_small_input} placeholder="x@gmail.com" />
              </div>
              <div className={add.box_full}>
                <div className={add.box_full_menu}>
                  <p className={showSummer ? "" : add.box_full_menu_active} onClick={handleToggle}>Zomer</p>
                  <p className={showSummer ? add.box_full_menu_active : ""} onClick={handleToggle}>Winter</p>
                </div>

                <div className={showSummer ? add.hidden : add.box_full_content}>
                  <div className={add.box_full_content_checkbox}>
                    <label className={add.box_small_label}>Groeven</label>
                    <div className={add.box_full_content_options}>
                      <div className={add.box_full_content_checklist}>
                        <label className={add.box_small_checklist_label}>LV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="lv" name="lv" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="lv" name="lv" value="lv"></input>

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="rv" name="rv" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="rv" name="rv" value="rv"></input>

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="la" name="la" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="la" name="la" value="la"></input>

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="ra" name="ra" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="ra" name="ra" value="ra"></input>
                      </div>
                    </div>
                  </div>
                  <div className={add.box_full_content_image}>
                    <Image src="/car.svg" width='300px' height='370px' />
                  </div>
                </div>

                <div className={showSummer ? add.box_full_content : add.hidden}>
                  <div className={add.box_full_content_checkbox}>
                    <label className={add.box_small_label}>Groeven</label>
                    <div className={add.box_full_content_options}>
                      <div className={add.box_full_content_checklist}>
                        <label className={add.box_small_checklist_label}>LV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="lv" name="lv" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="lv" name="lv" value="lv"></input>

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="rv" name="rv" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="rv" name="rv" value="rv"></input>

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="la" name="la" placeholder="x,x" />
                        <input className={add.checkbox} type="checkbox" id="la" name="la" value="la"></input>

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask className={add.box_small_checklist_tire} mask="9,9" type="text" id="ra" name="ra" placeholder="x,x" />
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
                <textarea placeholder="Typ hier uw opmerking" />
              </div>
              <div className={add.box_small}>
                <label className={add.box_small_label}>Banden</label>
                <div className={add.box_small_checklist}>
                  <label className={add.box_small_checklist_label}>Winter</label>
                  <input className={add.checkbox} type="checkbox" id="winter" name="winter" value="winter"></input>
                  <label className={add.box_small_checklist_label}>Summer</label>
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
              <a href="#" className={add.box_small}>
                <p>Foto's</p>
                <div className={add.box_small_pics}>
                  <p>Band</p>
                  <p>Velg</p>
                </div>
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

export async function getStaticPaths() {
  const customers = await getAll();

  const paths = customers.map((customer) => ({
    params: { id: customer.id }, // Rename to `id`
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const customer = await getById(params.id); // Rename to `params.id`

  return { props: { customer } };
}