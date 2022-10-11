import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import styles from '../css/Sliders.module.css'
import Carousel from 'react-bootstrap/Carousel';


function Sliders() {

  const [data, setData]= useState([])

  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios('https://dd7548px.directus.app/items/carousel?fields=name.*')
      setData(result.data.data)
    }
    fetchData()
  },[])



  const carousel = data[0]?.name.map(index => {
    return(
        <Carousel.Item key={index.id}>
          <img className={styles.image} src={"https://dd7548px.directus.app/assets/"+index.directus_files_id} alt=""/>    
          <Carousel.Caption>
            <p className='text-black'>A votre écoute depuis 20 ans</p>
          </Carousel.Caption>
        </Carousel.Item>
    )
  
  })

  return (
    <>
      {/* <div className={styles.filter}>
        <div className={styles.blockCenter}>
          <h1 className={styles.title}>Richard's Immobilier</h1>
          <p>IMMOBILIER HAUT DE GAMME ET DE LUXE</p>
        </div>
      </div> */}
      <Carousel className={styles.carouss} fade>
      {carousel}
      </Carousel>
    </>
  );
}


export default Sliders
