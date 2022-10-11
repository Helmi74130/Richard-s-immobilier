import React from 'react'
import styles from '../css/HomeImg.module.css'
import {  Link } from "react-router-dom";
import img1 from '../img/villa.jpg'
import img2 from '../img/a.jpg'
import img3 from '../img/b.jpg'
import img4 from '../img/c.jpg'
import Sliders from '../components/Sliders'
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const HomeImg = () => {


  return (
    <>
      <div className={`${styles.bgImage} container-fluid`}>
        <div className='row'>
          <AnimationOnScroll delay={500} animateIn="animate__fadeInDown" animateOnce={true} className={`${styles.h100} d-flex flex-column justify-content-center align-items-center col-12 `}>
            <div className={styles.glass}>
              <h1 className={`${styles.h1Title} `}>Richard's Immobilier</h1>
              <h2>Vous donner ce que vous méritez</h2>
              <Link to="/nosbiens"><button className='text-light btn mt-2'>VOIR NOS BIENS</button></Link>
            </div>
          </AnimationOnScroll>
        </div>
      </div>
      <div className='container mt-5'>
      <div className='row'>
        <img className={`${styles.img} col-lg-6 col-12`} src={img1} alt='Villa avec piscine'/>
        <AnimationOnScroll animateIn="animate__fadeInLeft" animateOnce={true} className='col-xl-6 col-lg-4 col-md-3 col-12 d-flex flex-column justify-content-center align-items-center'>
          <h3 className={styles.h3}>Une toute nouvelle façon d'acheter</h3>
          <p>Chez Richard's immobilier nous sommes parfaitement conscients que l'achat d'un bien immobilier ne se résume pas à une simple transaction. Notre objectif et de vous guider étape par étape tout au long du processus.</p>
        </AnimationOnScroll>
        
      </div>
    </div>
      <div className='container mt-5'>
        <div className='row'>
         <AnimationOnScroll animateIn="animate__fadeInRight" animateOnce={true} className='col-12 col-md-4 d-flex flex-column justify-content-center align-items-center'>
            <h3 className={styles.h3}>Parce que nous savons que cela signifie beaucoup pour vous</h3>
            <p>
              Le luxe revoit ses normes et ses définitions. Le prestige n'est pas qu'une façade.
              Valeurs, Esprit, Engagement, Excellence du Service sont nos principaux objectifs.
              Au sein du cercle de Richard's Immobilier, nous vous avons préparé beaucoup de choses.
              Nos agents enthousiastes ont une botte secrète,
              Inspirer, conseiller, diffuser, c'est notre raison d'être.
            </p>
         </AnimationOnScroll>
         <div className='col-12 col-md-8'>
          <Sliders/>
         </div>
        </div>
      </div>
      <div className={`${styles.content} container-fluid mt-5`}>
        <div className={`${styles.block} row`}>
         <div className='col-xl-5 col-lg-5 col-md-7 d-flex flex-column justify-content-center align-items-center text-center'>
            <h4 className={styles.h4}>Trouvez un bien qui<br/> vous correspond <br/> et selon vos besoin</h4>
         </div>
         <div className='col-xl-7 col-lg-7 col-md-5'>
          <div className={`${styles.imgBlock} d-flex`}>
          <AnimationOnScroll className={`${styles.imgBottomFirst} me-3 shadow`} delay={500} animateOnce={true} animateIn="animate__fadeInRight"><img style={{height:"310px"}} src={img4} alt='Image rue de paris'/></AnimationOnScroll>
          <AnimationOnScroll className={`${styles.imgBottomMidle} me-3 shadow`} delay={1000} animateOnce={true} animateIn="animate__fadeInRight"><img style={{height:"310px"}} src={img2} alt='Image villa avec piscine0'/></AnimationOnScroll>
          <AnimationOnScroll className={`${styles.imgBottomEnd} shadow`} delay={1500} animateOnce={true} animateIn="animate__fadeInRight"><img style={{height:"310px"}} src={img3} alt='Rue de paris'/></AnimationOnScroll>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default HomeImg