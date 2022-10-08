import React, { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import styles from '../css/Header.module.css'
import img3 from '../img/richardbg.png'

const Header = () => {

  const [classHeaderButton, setclassHeaderButton]= useState('show')
  const handleclick= ()=>{
    if(classHeaderButton === 'd-none'){
      setclassHeaderButton('show')
    }else{
      setclassHeaderButton('d-none')
    }
  }

  return (
    <header>
      <div className={styles.titleBlock}>
        <Link to="/" className={styles.headerTitle}>
          <img className={styles.image} alt='logo' src={img3}/>
          <p className='text-light'>Richard's immobilier</p>
        </Link>
        <div className={styles.buttonBlock}>
          <button className='btn btn-dark mt-2' onClick={handleclick}><i className="bi bi-list"></i></button>
        </div>
      </div>
      <nav>
        <ul className={`${classHeaderButton} ${styles.link}`}>
          <li className={styles.liNav}><Link to="/">Accueil</Link></li>
          <li className={styles.liNav}><Link to="/nosBiens">Ventes</Link></li>
          <li className={styles.liNav}><Link to="/locations">Locations</Link></li>
          <li className={styles.liNav}><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className={`${classHeaderButton} ${styles.listSocial}`}>
        <ul className={styles.social}>
          <li className={styles.liSocial}><a href='https://www.instagram.com/'><i className="bi bi-instagram"></i></a></li>
          <li className={styles.liSocial}><a href='https://twitter.com/'><i className="bi bi-twitter"></i></a></li>
          <li className={styles.liSocial}><a href='https://fr-fr.facebook.com/'><i className="bi bi-facebook"></i></a></li>
        </ul>
      </div>
      
      <Outlet />
    </header>
  )
}

export default Header