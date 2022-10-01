import React from 'react'
import { Outlet, Link } from "react-router-dom";
import styles from '../css/Header.module.css'
import logo from '../img/richardbg.png'

const Header = () => {
  return (
    <header>
        <div className={styles.headerTitle}>
          <img className={styles.image} alt='logo' src={logo}/>
          <p>Richard's immobilier</p>
        </div>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/nosBiens">Nos Biens</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className={styles.listSocial}>
        <ul>
          <li><a href='https://www.instagram.com/'><i className="bi bi-instagram"></i></a></li>
          <li><a href='https://twitter.com/'><i className="bi bi-twitter"></i></a></li>
          <li><a href='https://fr-fr.facebook.com/'><i className="bi bi-facebook"></i></a></li>
        </ul>
      </div>
      <Outlet />
    </header>
  )
}

export default Header