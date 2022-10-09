import React from 'react'
import styles from '../css/HomeImg.module.css'
import { Outlet, Link } from "react-router-dom";
import img1 from '../img/villa.jpg'
import Sliders from '../components/Sliders'

const HomeImg = () => {
  return (
    <>
      <div className={`${styles.bgImage}  container-fluid`}>
        <div className='row'>
          <div className={`${styles.h100} d-flex flex-column justify-content-center align-items-center col-12 `}>
            <div className={styles.glass}>
              <h1 className={styles.h1Title}>Richard's Immobilier</h1>
              <h2>Vous donner ce que vous méritez</h2>
              <Link to="/nosbiens"><button className='text-light btn mt-2'>VOIR NOS BIENS</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <img className={`${styles.img} col-6`} src={img1} alt=''/>
          <div className='col-6 d-flex flex-column justify-content-center align-items-center'>
            <h3 className={styles.h3}>Une toute nouvelle façon d'acheter</h3>
            <p>Chez Richard's immobilier nous sommes parfaitement conscients que l'achat d'un bien immobilier ne se résume pas à une simple transaction. Notre objectif et de vous guider étape par étape tout au long du processus.</p>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
         <div className='col-6'>
          
         </div>
         <div className='col-6'>
          <Sliders/>
         </div>
        </div>
      </div>
    </>
  )
}

export default HomeImg