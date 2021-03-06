import React, { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import InputMask from "react-input-mask"

import styles from '../../../styles/Home.module.css'
import customers from '../../../styles/Klanten.module.css'
import add from '../../../styles/Add.module.css'

import { GraphQLClient } from 'graphql-request'
import { gql, useMutation } from '@apollo/client';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from 'next/router'

const graph = new GraphQLClient(
  "https://godefroy-api.herokuapp.com/"
);

function Klantendetail({ customer }) {

  const router = useRouter();

  async function handleOnSubmit(e) {
    e.preventDefault();
    fetch('/api/mail', {
      method: 'post',
      body: customer.email
    })
  }

  const [showSummer, setSummer] = useState("false");
  const handleToggle = () => {
    setSummer(!showSummer);
  };

  const customerId = JSON.stringify(customer.id);

  const UPDATE_CUSTOMER = gql`
  mutation updateCustomer (
    $name: String, 
    $plate: String, 
    $atelier: String, 
    $lang: String, 
    $email: String, 
    $remark: String, 
    $summerTires: Int,
    $winterTires: Int,
    $kit: Boolean, 
    $tire: Boolean,
    $slv: String,
    $sla: String,
    $sra: String,
    $srv: String,
    $wlv: String,
    $wla: String,
    $wra: String,
    $wrv: String,
    $slvp: Boolean,
    $slap: Boolean,
    $srap: Boolean,
    $srvp: Boolean,
    $wlvp: Boolean,
    $wlap: Boolean,
    $wrap: Boolean,
    $wrvp: Boolean
    ){
    updateCustomer(customerId: ${customerId},
      customer: {
      name: $name,
      plate: $plate,
      atelier: $atelier,
      lang: $lang,
      email: $email,
      remark: $remark,
      summerTires: $summerTires,
      winterTires: $winterTires,
      kit: $kit,
      tire: $tire,
      slv: $slv,
      sla: $sla,
      sra: $sra,
      srv: $srv,
      wlv: $wlv,
      wla: $wla,
      wra: $wra,
      wrv: $wrv,
      slvp: $slvp
      slap: $slap
      srap: $srap
      srvp: $srvp
      wlvp: $wlvp
      wlap: $wlap
      wrap: $wrap
      wrvp: $wrvp
      }){id}
    }
  `;

  const schema = yup.object().shape({
    name: yup.string().required(),
    plate: yup.string().required(),
    atelier: yup.string().required(),
    lang: yup.string().required(),
    email: yup.string().required(),
    remark: yup.string(),
    summerTires: yup.number().required(),
    winterTires: yup.number().required(),
    kit: yup.boolean(),
    tire: yup.boolean(),
    slv: yup.string(),
    sla: yup.string(),
    sra: yup.string(),
    srv: yup.string(),
    wlv: yup.string(),
    wla: yup.string(),
    wra: yup.string(),
    wrv: yup.string(),
    slvp: yup.boolean(),
    slap: yup.boolean(),
    srap: yup.boolean(),
    srvp: yup.boolean(),
    wlvp: yup.boolean(),
    wlap: yup.boolean(),
    wrap: yup.boolean(),
    wrvp: yup.boolean()
  });

  const { name, plate, atelier, lang, email, remark, summerTires, winterTires, kit, tire, slv, sla, sra, srv, wlv, wla, wra, wrv, slvp, slap, srap, srvp, wlvp, wlap, wrap, wrvp } = customer;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [updateCustomer, { loading: updateCustomerLoading, error: updateCustomerError }] = useMutation(UPDATE_CUSTOMER);

  const handle = (customer) => {
    const customerFormData = {
      ...customer,
    }
    updateCustomer({
      variables: customerFormData
    })
    router.push('/klanten');
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
          <form onSubmit={handleSubmit(handle)}>

            <div className={customers.header}>
              <input {...register("name")} className={add.name} type="text" placeholder="Naam" defaultValue={name} />
              <p>{errors.name?.message}</p>
              <button className={add.submit} type="submit" value="Submit">Opslaan</button>
            </div>

            <div className={add.box}>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Nummerplaat *</label>
                <input {...register("plate")} className={add.box_small_input} type="text" placeholder="Nummerplaat" defaultValue={plate} />
                <p>{errors.plate?.message}</p>
              </div>

              <div className={add.box_small}>
                <label className={add.box_small_label}>Ligging *</label>
                <InputMask {...register("atelier")} className={add.box_small_input} mask="a9" placeholder="X1" defaultValue={atelier} />
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>Taal *</label>
                <select {...register("lang")} className={add.box_small_input}>
                  <option value={lang}>{lang}</option>
                  <option value="Nederlands">Nederlands</option>
                  <option value="Frans">Frans</option>
                  <option value="Engels">Engels</option>
                  {/* selected={lang === value ? true : false} */}
                </select>
                <p>{errors.lang?.message}</p>
              </div>

              <div className={add.box_medium}>
                <label className={add.box_small_label}>E-mail *</label>
                <input {...register("email")} className={add.box_small_input} type="email" placeholder="x@gmail.com" defaultValue={email} />
                <p>{errors.email?.message}</p>
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
                        <InputMask {...register("slv")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={slv} />
                        <input {...register("slvp")} className={add.checkbox} type="checkbox" defaultChecked={slvp} />

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask {...register("srv")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={srv} />
                        <input {...register("srvp")} className={add.checkbox} type="checkbox" defaultChecked={srvp} />

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask {...register("sla")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={sla} />
                        <input {...register("slap")} className={add.checkbox} type="checkbox" defaultChecked={slap} />

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask {...register("sra")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={sra} />
                        <input {...register("srap")} className={add.checkbox} type="checkbox" defaultChecked={srap} />
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
                        <InputMask {...register("wlv")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={wlv} />
                        <input {...register("wlvp")} className={add.checkbox} type="checkbox" defaultChecked={wlvp} />

                        <label className={add.box_small_checklist_label}>RV</label>
                        <InputMask {...register("wrv")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={wrv} />
                        <input {...register("wrvp")} className={add.checkbox} type="checkbox" defaultChecked={wrvp} />

                        <label className={add.box_small_checklist_label}>LA</label>
                        <InputMask {...register("wla")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={wla} />
                        <input {...register("wlap")} className={add.checkbox} type="checkbox" defaultChecked={wlap} />

                        <label className={add.box_small_checklist_label}>RA</label>
                        <InputMask {...register("wra")} className={add.box_small_checklist_tire} mask="9,9" placeholder="x,x" defaultValue={wra} />
                        <input {...register("wrap")} className={add.checkbox} type="checkbox" defaultChecked={wrap} />
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
                <textarea {...register("remark")} className={add.box_small_input} type="text" placeholder="Typ hier uw opmerking.." defaultValue={remark} />
              </div>

              <div className={add.box_small}>
                <p>Aantal banden</p>
                <div className={add.box_small_checklist}>
                  <label className={add.box_small_checklist_label}>Zomer: *</label>
                  <input {...register("summerTires")} className={add.box_small_input} placeholder="x" defaultValue={summerTires} />
                  <p>{errors.summerTires?.message}</p>
                  <label className={add.box_small_checklist_label}>Winter: *</label>
                  <input {...register("winterTires")} className={add.box_small_input} placeholder="X" defaultValue={winterTires} />
                  <p>{errors.winterTires?.message}</p>
                </div>
              </div>

              <div className={add.box_small}>
                <p>Kit of band</p>
                <div className={add.box_small_checklist_two}>
                  <label className={add.box_small_checklist_label}>Kit</label>
                  <input {...register("kit")} id="kit" name="kit" type="checkbox" className={add.checkbox} defaultChecked={kit} />
                  <label className={add.box_small_checklist_label}>Band</label>
                  <input {...register("tire")} id="tire" name="tire" type="checkbox" className={add.checkbox} defaultChecked={tire} />
                </div>
              </div>

              <a href={'/klanten/' + customer.id + '/foto'} className={add.box_clickable}>
                <p>Foto's</p>
              </a>

              {admin ?
                <div className={add.automatic_mail}>
                  <p>Automatische mail</p>
                  <div className={add.automatic}>
                    <div className={add.automatic_title}>
                      <p>Profielen</p>
                    </div>
                    <a href="#" className={add.automatic_button}>
                      <p onClick={handleOnSubmit}>Verstuur</p>
                    </a>
                  </div>
                </div>
                : ''}

            </div>

          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>?? 2021 - Garage Godefroy x Jaxxpected</p>
      </footer>
    </div>
  )
}

export default Klantendetail

export async function getServerSideProps({ params }) {
  const { customer } = await graph.request(
    `
    query Customer($id: ID!) {
      customer(id: $id) {
        id
        name
        plate
        atelier
        email
        lang
        remark
        summerTires
        winterTires
        kit
        tire
        slv
        sla
        srv
        sra
        wlv
        wla
        wrv
        wra
        slvp
        slap
        srap
        srvp
        wlvp
        wlap
        wrap
        wrvp
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

export async function getServerSidePaths() {
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