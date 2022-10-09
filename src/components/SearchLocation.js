import React, {  useEffect ,  useState} from 'react'
import {  Link } from "react-router-dom";
import axios from 'axios';
import styles from '../css/Card.module.css'
import img from '../img/richard.png'

const SearchLocation = () => {

  const [roomsValue, setRoomsValue]= useState('') 
  const handleRoomsValue = (e)=>{
    setRoomsValue('&filter[rooms][_eq]='+e.target.value)
  }
  if (roomsValue === '&filter[rooms][_eq]=') {
    setRoomsValue('')
  }

  const [valueProduct, setValueProduct] = useState('');
  const handleChangeProduct = (e) => {
    setValueProduct('&filter[type][name][_eq]='+e.target.value);
  };
  if (valueProduct === '&filter[type][name][_eq]=bien') {
    setValueProduct('')
  }
  
  const [valueCity, setValueCity] = useState('');
  const handleChangeCity = (e) => {
    setValueCity('&filter[city][name][_eq]='+e.target.value);
  };
  if (valueCity === '&filter[city][name][_eq]=localisation') {
    setValueCity('')
  }
  console.log(valueCity);
  const [valuePriceMin, setvaluePriceMin] = useState(0);
  const handleChangeValuePriceMin = (e) => {
     setvaluePriceMin(e.target.value);   
  };

  const [valuePriceMax, setvaluePriceMax] = useState(99999999);
  const handleChangeValuePriceMax = (e) => {
    setvaluePriceMax(e.target.value);
  }
  
  if(valuePriceMax === ''){
    setvaluePriceMax(99999999)
  }

  /* this function check input goods */
  const [invalidClassName, setInvalidClassName]=useState('')
  const [messageFlash, setmessageFlash]= useState('') 
  function checkInputGoods(){
    if(valuePriceMin < 0){
      setmessageFlash('Entrez un chiffre positive')
      setInvalidClassName('is-invalid')
    }else{
      setmessageFlash('')
      setInvalidClassName('')
    }
  }

  /* this function check input localisation */
  const [invalidClassNameMax, setInvalidClassNameMax]=useState('')
  const [messageFlashMax, setmessageFlashMax]=useState('') 
  function checkInputLocalisation(){
    if(valuePriceMax < 0){
      setmessageFlashMax('Entrez un chiffre positive')
      setInvalidClassNameMax('is-invalid')
    }else{
      setmessageFlashMax('')
      setInvalidClassNameMax('')
    }
  }
  

  const [emptyData, setEmptyData] = useState()

  /* this function retrieves data for the search bar */
  const [data, setData]= useState([])
  const handleButton = (e)=>{
    checkInputGoods()
    checkInputLocalisation()
    e.preventDefault()
    const fetchData =async () =>{
      await axios(`http://localhost:8055/items/product?fields=title,price,id,surface,type.name,city.name,price,thumbnail,rooms${valueProduct}${roomsValue}${valueCity}&filter[price][_between]=${valuePriceMin},${valuePriceMax}&filter[state][_eq]=location`)
      .then( 
        response => {
          if (!response.data.data || response.data.data.length === 0) {
            setEmptyData('Aucun résultat')
          }else{
            setEmptyData(null)
          }
          setData(response.data.data)   
        })
        .catch(function (error) {
          if (error) {
            setEmptyData('Aucun résultat')
          } else{
            setEmptyData(null)
          }
        });
    }
    fetchData()
  }

  /* This function get the names of type and cities  */
  const [dataAll, setDataAll]= useState([])
  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios(`http://localhost:8055/items/product?fields=city.name,type.name&filter[state][_eq]=location`)
      setDataAll(result.data.data)
    }
    fetchData()
  },[])

  /* this function removes duplicate cities and goods */
  let citys =[]
  let goods =[]
  dataAll.map(index => {
    citys.push(index.city.name)
    goods.push(index.type.name)
  })
  let citysFilter= [ ...new Set(citys) ]
  let goodsFilter= [ ...new Set(goods) ]

  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return str.join(".");
  }

  /* this function displays search data */
const card =  data.map(index => (
  <ul key={index.id} className={`${styles.cards} col-5 mt-5`}>
    <li>
      <Link to={"/produit/"+index.id}  className={styles.card}>
        <img src={"http://localhost:8055/assets/"+index.thumbnail} className={styles.card__image} alt="image du bien immobilier" />
        <div className={styles.card__overlay}>
          <div className={styles.card__header}>
            <svg className={styles.card__arc} xmlns=""><path /></svg>                     
            <img className={styles.card__thumb} src={img} alt="" />
            <div className={`${styles.card__text} d-flex justify-content-between w-100`}>
              <h3 className={styles.card__title}>{capitalizeFirstLetter(index.type.name)} {index.type.name === 'maison' || index.type.name === 'appartement'? index.rooms +' pièces' : null }</h3>            
              <span className={styles.card__status}>{index.city.name}</span>
            </div>
          </div>
          <div className={`${styles.card__description} d-flex justify-content-around`}>
            <p>{separator(index.price)} <i className="bi bi-currency-euro"></i></p>
            <p>{index.surface} m<sup>2</sup></p>
            { index.rooms ? <p>{index.rooms} pièces</p>: null}
          </div>
        </div>
      </Link>
    </li>
  </ul>
))

const selectGoods = goodsFilter.map(index =>(
  <option key={index} value={""+index}>{capitalizeFirstLetter(index)}</option>
))

const selectCity = citysFilter.map(index =>(
  <option key={index} value={""+index}>{capitalizeFirstLetter(index)}</option>
))

useEffect(()=>{
  const fetchData =async () =>{
    const result = await axios('http://localhost:8055/items/product?fields=title,price,id,surface,city.name,price,thumbnail,rooms,type.name&filter[state][_eq]=location')
    setData(result.data.data)
  }
  fetchData()
},[])

return (
  <>
  <h1 className={`${styles.h1} mt-5 ms-5 mb-5`}>Locations</h1>
    <div className={`${styles.bgHeader} container mt-5 bg-light p-3 rounded`}>
      <form className="row text-light">
        <div className="col-xl-2 col-md-3 col-6">
            <label className="form-label ms-2">Type de bien: </label>
            <select className="form-select" onChange={handleChangeProduct}>
            <option value="bien">Tous les bien</option>
                {selectGoods}
            </select>
        </div>
        <div className="col-xl-2 col-md-4 col-6">
          <label className="form-label ms-2">Localisation: </label>
          <select className="form-select " onChange={handleChangeCity}>
          <option value="localisation">Toutes les villes</option>
            {selectCity}
          </select>
        </div>
        <div className="col-xl-2 col-md-4 col-6">
          <label className="form-label ms-2">Budjet min: </label>
          <input placeholder="Min" className={"form-control "+invalidClassName} onChange={handleChangeValuePriceMin} type="number"/>
          <p className="invalid-feedback">{messageFlash}</p>
        </div>
        <div className="col-xl-2 col-md-4 col-6">
          <label className="form-label ms-2">Budjet max: </label>
          <input placeholder="Max" className={"form-control "+invalidClassNameMax} onChange={handleChangeValuePriceMax} type="number"/>
          <p className="invalid-feedback">{messageFlashMax}</p>
        </div>
        <div className="col-xl-2 col-md-4 col-6">
          <p>Nombres de pièces :</p>
          <div>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="1"/>
            <label className="form-check-label me-2">1</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="2"/>
            <label className="form-check-label me-2">2</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="3"/>
            <label className="form-check-label me-2">3</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="4"/>
            <label className="form-check-label me-2">4</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="5"/>
            <label className="form-check-label me-2">5</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value="6"/>
            <label className="form-check-label me-2">6</label>
            <input className="form-check-input me-1" onChange={handleRoomsValue} name="room"  type="radio" value=""/>
            <label className="form-check-label me-2">Tous</label>
          </div>
        </div>
        <div className="col-xl-2 d-flex align-items-end justify-content-center col-md-4 col-6">
          <button onClick={handleButton} className='btn btn-dark ps-3 pe-3'><i className="bi bi-search"></i> Chercher</button>
        </div>
        <h2 className='text-center mt-3 text-danger'>{emptyData}</h2>
      </form>
    </div>
    <div className='container'>
      <div className='row justify-content-around'>
        {card}
      </div>
    </div>
  </>
)
  
}

export default SearchLocation