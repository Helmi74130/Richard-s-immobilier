import React , {  useEffect , useState} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


const Product = () => {
  const params = useParams()
  console.log(params);

  const [data, setData]= useState([])


  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios(`http://localhost:8055/items/product?filter[id][_eq]=${params.id}`)
      setData(result.data.data)
    }
    fetchData()
  },[])



 const product =  data.map(index => (
    <div key={index.id}>
      <h1>Magnifique {index.title} {index.rooms} pièces à saisir</h1>
    </div>
  ))

  return (
    <>
      <Header/>
      {product}
    </>
  )
}

export default Product