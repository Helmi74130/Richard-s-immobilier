import React, { useEffect, useState } from 'react'
import { Outlet, Link, NavLink} from "react-router-dom";
import styles from '../css/Header.module.css'
import img3 from '../img/richardbg.png'

const Header = () => {



  const [largeur, setLargeur] = useState(window.innerWidth)
  const [toggleMenu, setToggleMenu]= useState(false)
  const toggleNavSmallScreen= ()=>{
      setToggleMenu(!toggleMenu)
  }
  useEffect(() => {
    const changeWidth = () =>{
      setLargeur(window.innerWidth)
      if (window.innerWidth > 800) {
        setToggleMenu(false)
      }
    }
    window.addEventListener('resize', changeWidth)

    return() => {
      window.removeEventListener('resize', changeWidth)
    }
  },[])

  return (
    <header>
      <div className={styles.titleBlock}>
        <NavLink to="/accueil" className={styles.headerTitle}>
          <img className={styles.image} alt='logo' src={img3}/>
          <p className='text-light'>Richard's immobilier</p>
        </NavLink>
        <div className={styles.buttonBlock}>
          <button className='btn btn-dark mt-2' onClick={toggleNavSmallScreen}><i className="bi bi-list"></i></button>
        </div>
      </div>
      {(toggleMenu || largeur > 800) && (
        <nav>
          <ul className={styles.link}>
            <li className={styles.liNav}><NavLink className={(navData) => (navData.isActive ? `${styles.actives} ` : '')} to="/accueil">Accueil</NavLink></li>
            <li className={styles.liNav}><NavLink className={(navData) => (navData.isActive ? `${styles.actives} ` : '')} to="/nosbiens">Nos biens</NavLink></li>
            <li className={styles.liNav}><NavLink className={(navData) => (navData.isActive ? `${styles.actives} ` : '')} to="/ventes">Ventes</NavLink></li>
            <li className={styles.liNav}><NavLink className={(navData) => (navData.isActive ? `${styles.actives} ` : '')} to="/locations">Locations</NavLink></li>
            <li className={styles.liNav}><NavLink className={(navData) => (navData.isActive ? `${styles.actives} ` : '')} to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      )}
      <div className={styles.listSocial}>
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