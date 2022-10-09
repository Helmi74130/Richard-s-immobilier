import React from 'react'
import styles from '../css/FormContact.module.css'
import img from '../img/villa2.jpg'

const FormContact = () => {
  return (
    <div className={`${styles.contain} container mt-5`}>
      <div className='row'>
          <img className={`${styles.img} col-lg-6 col-12 p-0`} src={img} alt="image"/>
          <div className={`${styles.containText} col-lg-6 col-12 text-center p-5`}>
            <h2 className={styles.h2} >Contactez-nous pour plus de  <br/>renseignement</h2>
            <p className={styles.p}>Ou prenez directement rendez-vous <br/> par téléphone au <a className='text-dark' href='tel:+0687741241'>0687741241</a></p>
            <input className={styles.input} type="email" placeholder="Adresse e-mail"/>
            <textarea placeholder="Méssage" className={styles.input} rows="6"></textarea>
            <button className={`${styles.button} mt-5`} type="submit">Envoyer</button>
          </div>
      </div>
    </div>

  )
}

export default FormContact