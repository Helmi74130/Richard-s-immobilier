import React , {  useEffect , useState} from 'react'
import axios from 'axios';
import styles from '../css/Card.module.css'
import { Link } from "react-router-dom";

    
const Card = () => {

  const [data, setData]= useState([])

  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios('http://localhost:8055/items/product?fields=title,price,id,surface,city.name,price,thumbnail,rooms')
      setData(result.data.data)
    }
    fetchData()
  },[])

 const card =  data.map(index => (
    <Link to={"/nosBiens/"+index.id} key={index.id} className={styles.card}>
      <img className={styles.imgCard} src={"http://localhost:8055/assets/"+index.thumbnail} alt=""/>
      <div className={styles.cardDescription}>
        <div className={styles.descriptionTop}>
          <h3>{index.title} {index.rooms} pièces</h3>
          <p><i className="bi bi-geo-alt"></i>{index.city.name}</p>
        </div>
        <div className={styles.descriptionBottom}>
          <p>{index.price} <i className="bi bi-currency-euro"></i></p>
          <p>{index.surface} m<sup>2</sup></p>
        </div>
      </div>
    </Link>
  ))

  return (
    <main>
      {card}
    </main>
  )
}

export default Card