import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import InputMask from "react-input-mask";
import { gql, useMutation } from '@apollo/client';

import styles from '../styles/Home.module.css'
import customers from '../styles/Klanten.module.css'
import add from '../styles/Add.module.css'

const CREATE = gql`
  mutation addCustomer($name: String!, $plate: String!, $atelier: String!, $lang: String!, $email: String!, $remark: String!){
    addCustomer(customer: { name: $name, plate: $plate, atelier: $atelier, lang: $lang, email: $email, remark: $remark}){
      id
    }
  }
`;

function Toevoegen() {

  const [name, setName] = useState('');
  const [plate, setPlate] = useState('');
  const [atelier, setAtelier] = useState('');
  const [lang, setLang] = useState('');
  const [email, setEmail] = useState('');
  const [remark, setRemark] = useState('');

  const [create, { data }] = useMutation(CREATE);
  useEffect(() => {
    if (data) { console.log(data); }
  }, [data]);

  const [showSummer, setSummer] = useState("false");
  const handleToggle = () => {
    setSummer(!showSummer);
  };

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
            create({ variables: { name: name, plate: plate, atelier: atelier, lang: lang, email: email, remark: remark } });
          }}>
            <div className={customers.header}>
              <input className={add.name} placeholder="Naam" onChange={e => setName(e.target.value)} />
              <button className={add.submit} type="submit" value="Submit">Opslaan</button>
            </div>
            <div className={add.box}>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Nummerplaat</label>
                <input className={add.box_small_input} placeholder="X-XXX-XXX" onChange={e => setPlate(e.target.value)} />
              </div>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Ligging</label>
                <InputMask className={add.box_small_input} mask="a9" placeholder="XX" onChange={e => setAtelier(e.target.value)} />
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>Taal</label>
                <select className={add.box_small_input} onChange={e => setLang(e.target.value)}>
                  <option value="Nederlands">Nederlands</option>
                  <option value="Frans">Frans</option>
                  <option value="Engels">Engels</option>
                </select>
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>E-mail</label>
                <input className={add.box_small_input} placeholder="x@gmail.com" onChange={e => setEmail(e.target.value)} />
              </div>

              <div className={add.box_full}>
                <div className={add.box_full_menu}>
                  <p className={showSummer ? "" : add.box_full_menu_active} onClick={handleToggle}>Zomer</p>
                  <p className={showSummer ? add.box_full_menu_active : ""} onClick={handleToggle}>Winter</p>
                </div>

                <div className={showSummer ? add.hidden : add.box_full_content}>
                  <div className={add.box_full_content_checkbox}>
                    <label className={add.box_small_label}>Profielen</label>
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
                    <label className={add.box_small_label}>Profielen</label>
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
                <p>Aantal banden</p>
                <div className={add.box_small_checklist}>
                  <label className={add.box_small_checklist_label}>Zomer: </label>
                  <InputMask className={add.box_small_input} mask="9" placeholder="X" />
                  <label className={add.box_small_checklist_label}>Winter</label>
                  <InputMask className={add.box_small_input} mask="9" placeholder="X" />
                </div>
              </div>

              <div className={add.box_small}>
                <p>Kit of band</p>
                <div className={add.box_small_checklist_two}>
                  <label className={add.box_small_checklist_label}>Kit</label>
                  <input className={add.checkbox} type="checkbox" id="kit" name="kit" value="kit" />
                  <label className={add.box_small_checklist_label}>Band</label>
                  <input className={add.checkbox} type="checkbox" id="band" name="band" value="band" />
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

export default Toevoegen