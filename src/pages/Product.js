import React , {  useEffect , useState} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from '../css/Product.module.css'
import Footer from '../components/Footer'


const Product = () => {
  const params = useParams()
  const [data, setData]= useState([])
  const [imageData, setImageData]= useState([])

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }


  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios(`http://localhost:8055/items/product?filter[id][_eq]=${params.id}&fields=title,description,price,reference,id,state,date_created,position,surface,type.name,bedrooms,city.name,price,thumbnail,rooms,images.*`)
      setData(result.data.data)
    }
    fetchData()
    
  },[])

  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios(`http://localhost:8055/items/product?filter[id][_eq]=${params.id}&fields=images.*,tag.tag_id.name`)
      setImageData(result.data.data)
    }
    fetchData()
  },[])

let longitude =''
let latitude =''

 const product =  data.map(index => {
  longitude = index.position.coordinates[0]
  latitude = index.position.coordinates[1]
  return(
    <div  key={index.id}>
      <h1 className='mt-5 ms-5'>{capitalizeFirstLetter(index.type.name)} {index.state === 'vente'? 'à vendre' : 'à louer'}</h1>
    </div>
  )
 })
 
 let urlMap = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp&output=embed`
  
  const tag = imageData[0]?.tag.map(index => (
      <p key={index.tag_id.name}>{index.tag_id.name}</p>
  ))

function surfacePrice(price, surface){
    return price / surface
  }

  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  /* This function are the carousel parameters */
    function SampleArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, background: "lightgrey" }}
          onClick={onClick}
        />
      );
    }
    var settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 900,
      slidesToShow: 1,
      nextArrow: <SampleArrow />,
      prevArrow: <SampleArrow />,
      pauseOnHover: true,
      slidesToScroll: 1
    };

  return (
    <div className={styles.content}>
      <Header/>
      {product}
      <div className='container'>
        <div className='row'>
        <Slider className='col-md-7 col-11 mt-5' {...settings}>
          {imageData[0]?.images.map(index =>(
          <div key={index.id}>
            <img className={styles.img} alt='' src={"http://localhost:8055/assets/"+index.directus_files_id}/>
          </div>
          ))}
        </Slider>
        {data.map(index => (
          <>
            <div key={index.id} className='col-md-4 col-11 d-flex flex-column text-center justify-content-evenly'>
              <div className=''>
                <p className={styles.price}>{separator(index.price)}<i className="bi bi-currency-euro"></i></p>
              {/* <p>{index.state === 'vente'? 'soit '+ Math.round(surfacePrice(index.price, index.surface))+' e/m2': ''}</p> */}
              </div>
              <div className=''>
                <p className='fs-2'> {index.rooms} {index.rooms === null ? null : 'pièces'} </p>
                <p className='fs-2'> {index.surface} m<sup>2</sup></p>
              </div>
              <p className='fs-3'><i className="bi bi-geo-alt"></i> {index.city.name}</p>
              <div>
                <p>Mise en ligne le: {new Date(index.date_created).toLocaleString('fr-FR')}</p>
                <p>Réf: {index.reference}</p>
              </div>
            </div>
            <div className='container mt-5'>
              <div className='row'>
                <div className='col-12 row'>
                  <div className='col-7'>
                    <h3>L'essentiel</h3>
                    <div className='d-flex justify-content-around mt-4 border pt-3'>
                      {index.rooms?<div className='d-flex'>
                        <svg width="24" height="24" viewBox="0 0 39.9 39.9" xmlns="http://www.w3.org/2000/svg" className="c-icon__svg" aria-hidden="true"><path d="M0 4.9V35c0 2.7 2.2 4.9 4.9 4.9H35c2.7 0 4.9-2.2 4.9-4.9V4.9C39.9 2.2 37.7 0 35 0H4.8C2.2.1 0 2.3 0 4.9zm13-2.6h21.9c1.5 0 2.7 1.2 2.7 2.7v30.1c0 1.5-1.2 2.7-2.7 2.7H16.8V14.3H13v-12zm0 14.2h1.6v21.2H4.8c-1.5 0-2.7-1.2-2.7-2.7V16.5H13zm-2.2-2.2H2.2V4.9c0-1.5 1.2-2.7 2.7-2.7h6v12.1h-.1z"></path></svg>
                        <p className='ms-2'>{index.rooms} {index.rooms === 1 ? 'pièce':'pièces'}</p>
                      </div> : null}
                      {index.surface? <div className='d-flex'>
                        <svg width="24" height="24" viewBox="0 0 91.5 90.3" xmlns="http://www.w3.org/2000/svg" className="c-icon__svg" aria-hidden="true"><path d="M52.5 65.7h-2.7c-1.3 0-2.5-1-2.5-2.3v-11l-2.9 5.5c-.6 1.1-1.7 1.8-3 1.8h-1.6c-1.3-.1-2.4-.8-3-1.9l-2.7-5.4v10.7c0 1.3-1 2.4-2.3 2.5H29c-1.3 0-2.4-1-2.5-2.3V39.4c0-1.3 1-2.4 2.3-2.5H33c1.1 0 2.1.7 2.6 1.6l5.1 10.6L46 38.6c.5-1 1.5-1.6 2.6-1.6h4c1.3 0 2.4 1 2.5 2.3V63.2c0 1.3-1 2.4-2.3 2.5h-.3zm-3.2-21.6v19.1c0 .2.2.4.4.5H52.5c.2 0 .4-.1.5-.3v-24c0-.2-.1-.4-.3-.5h-4.1c-.3 0-.6.2-.8.5l-7 14.3-6.9-14.3c-.3-.2-.6-.4-.9-.4h-4.1c-.2 0-.4.1-.5.3V63.2c0 .2.1.4.3.5h2.9c.2 0 .4-.1.5-.3V43.8L38.6 57c.3.4.7.7 1.2.8h1.6c.5 0 1-.3 1.2-.7l6.7-13zM69 54.6h-8.5c-1.3 0-2.4-1-2.5-2.3v-2.1c0-4.5 3.4-5.8 5.6-6.6.7-.3 1.8-.7 1.8-1 0-.1-.3-.2-.9-.2-.7.1-1.4.3-2.1.7-1 .8-2.5.6-3.3-.5l-.1-.1-.5-.7c-.8-1.2-.5-2.7.6-3.5 1.7-1.2 3.7-1.7 5.8-1.7 3.8 0 6.6 2.4 6.6 5.7 0 4.5-3.5 5.9-5.6 6.7H69c1.3 0 2.4 1 2.5 2.4v.7c0 1.3-1 2.4-2.4 2.5H69zm-4.2-14.3c.7 0 1.4.2 2 .7.4.4.7.9.6 1.5 0 1.6-1.6 2.3-3.1 2.9-2.1.8-4.3 1.6-4.3 4.7v2c0 .2.1.4.3.5h8.6c.2 0 .4-.1.5-.3v-.7c0-.2-.1-.5-.4-.5H62.1v-1.2c0-1.6 1.5-2.1 3-2.6 2.6-.9 4.4-1.8 4.4-4.8 0-2.2-1.9-3.7-4.6-3.7-1.6-.1-3.3.4-4.6 1.3-.2.2-.3.5-.1.7l.4.6c.1.1.2.2.3.2.1 0 .2 0 .3-.1l.1-.1c.9-.6 1.9-.9 3-1l.5-.1z"></path><path d="M68.6 90.3H15.8c-3.4 0-6.2-2.8-6.2-6.2V44.4H6.2c-3.4 0-6.2-2.8-6.2-6.2v-32C0 2.8 2.8 0 6.2 0H59c3.4 0 6.2 2.8 6.2 6.2v18.7h20c3.4 0 6.2 2.8 6.2 6.2V63c0 3.4-2.8 6.2-6.2 6.2H74.9V84c0 3.5-2.8 6.3-6.3 6.3zM6.2 4C5 4 4 5 4 6.2v31.9c0 1.2 1 2.2 2.2 2.2h7.3V84c0 1.2 1 2.2 2.2 2.2h52.9c1.2 0 2.2-1 2.2-2.2V65.3h14.5c1.2 0 2.2-1 2.2-2.2v-32c0-1.2-1-2.2-2.2-2.2h-24V6.2c0-1.2-1-2.2-2.2-2.2H6.2z"></path></svg>
                        <p className='ms-2'>Surface {index.surface} m<sup>2</sup></p>
                      </div> : null}
                      { index.bedrooms ? <div className='d-flex'>
                        <svg width="24" height="24" viewBox="0 0 90.4 52.5" xmlns="http://www.w3.org/2000/svg" className="c-icon__svg" aria-hidden="true"><path d="M82.3 19.9v-9.5C82.3 4.7 77.7 0 71.9 0H18.5C12.7 0 8.1 4.7 8.1 10.4v9.5C3.2 21.7 0 26.3 0 31.5V47c0 3.1 2.5 5.6 5.6 5.6h79.2c3.1 0 5.6-2.5 5.6-5.6V31.5c0-5.2-3.2-9.8-8.1-11.6zm4.1 27c0 .9-.7 1.6-1.6 1.6H5.6c-.9 0-1.6-.7-1.6-1.6V31.5c0-4.6 3.7-8.3 8.3-8.3H78c4.6 0 8.3 3.7 8.3 8.3v15.4zM18.5 4h53.4c3.5 0 6.4 2.9 6.4 6.4v8.7h-7.8c-.6-5.2-5.1-9.2-10.3-9.2h-3.4c-5.3 0-9.7 4-10.3 9.2h-2.6c-.6-5.2-5.1-9.2-10.3-9.2h-3.4c-5.3 0-9.7 4-10.3 9.2h-7.8v-8.7C12.1 6.9 15 4 18.5 4zm21.4 15.1h-16c.6-3 3.2-5.2 6.3-5.2h3.4c3 .1 5.7 2.2 6.3 5.2zm26.6 0h-16c.6-3 3.2-5.2 6.3-5.2h3.4c3.1.1 5.7 2.2 6.3 5.2z"></path></svg>
                        <p className='ms-2'>{index.bedrooms} chambres</p>
                      </div>: null}
                    </div>
                    <h3 className='mt-4'>Autres</h3>
                    <div className='d-flex justify-content-around border pt-3 mt-4'>
                        {tag}
                    </div>
                    {index.description?<> <h3 className='mt-4'>Description</h3>
                    <div className='p-4 fs-5 border mt-4'>
                        <p>{index.description}</p>
                    </div></> : null}
                  </div>
                  <div className='col-4'>
                  <iframe width="100%" height="100%"  src ={urlMap}></iframe>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
        </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Product