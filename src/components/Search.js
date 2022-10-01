import React, {  useEffect ,  useState} from 'react'
import {  Link } from "react-router-dom";
import axios from 'axios';
import styles from '../css/Card.module.css'

const Search = () => {

    const [roomsValue, setRoomsValue]= useState('') 
    const handleRoomsValue = (e)=>{
      setRoomsValue('&filter[rooms][_eq]='+e.target.value)
    }

    const [valueProduct, setValueProduct] = useState('');
    const handleChangeProduct = (e) => {
      setValueProduct('&filter[type][name][_eq]='+e.target.value);
    };

    const [valueCity, setValueCity] = useState('');
    const handleChangeCity = (e) => {
      setValueCity('&filter[city][name][_eq]='+e.target.value);
    };
    const [valuePriceMin, setvaluePriceMin] = useState(0);
    const handleChangeValuePriceMin = (e) => {
      setvaluePriceMin(e.target.value);
    };
  
    const [valuePriceMax, setvaluePriceMax] = useState(99999999);
    const handleChangeValuePriceMax = (e) => {
      setvaluePriceMax(e.target.value);
    };

    /* this function check input goods */
    const [invalidClassName, setInvalidClassName]=useState('')
    const [messageFlash, setmessageFlash]= useState('') 
    function checkInputGoods(){
      if(valueProduct === '&filter[type][name][_eq]=bien'){
        setmessageFlash('Veuillez renseigner ce champs')
        setInvalidClassName('is-invalid')
      }else{
        setmessageFlash('')
        setInvalidClassName('')
      }
    }

    /* this function check input localisation */
    const [invalidClassNameLoc, setInvalidClassNameLoc]=useState('')
    const [messageFlashLocalisation, setmessageFlashLocalisation]= useState('') 
    function checkInputLocalisation(){
      if(valueCity === '&filter[city][name][_eq]=localisation'){
        setmessageFlashLocalisation('Veuillez renseigner ce champs')
        setInvalidClassNameLoc('is-invalid')
      }else{
        setmessageFlashLocalisation('')
        setInvalidClassNameLoc('')
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
        await axios(`http://localhost:8055/items/product?fields=title,price,id,surface,type.name,city.name,price,thumbnail,rooms${valueProduct}${roomsValue}${valueCity}&filter[price][_between]=${valuePriceMin},${valuePriceMax}`)
        .then( 
          response => {
            if (!response.data.data || response.data.data.length == 0) {
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
        const result = await axios(`http://localhost:8055/items/product?fields=city.name,type.name`)
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

    /* this function displays search data */
  const card =  data.map(index => (
    <Link to={"/produit/"+index.id} key={index.id} className={styles.card}>
      <img className={styles.imgCard} src={"http://localhost:8055/assets/"+index.thumbnail} alt=""/>
      <div className={styles.cardDescription}>
        <div className={styles.descriptionTop}>
          <h3>{capitalizeFirstLetter(index.type.name)} {index.rooms} pièces</h3>
          <p><i className="bi bi-geo-alt"></i>{index.city.name}</p>
        </div>
        <div className={styles.descriptionBottom}>
          <p>{index.price} <i className="bi bi-currency-euro"></i></p>
          <p>{index.surface} m<sup>2</sup></p>
        </div>
      </div>
    </Link>
  ))

  const selectGoods = goodsFilter.map(index =>(
    <option key={index} value={""+index}>{capitalizeFirstLetter(index)}</option>
  ))

  const selectCity = citysFilter.map(index =>(
    <option key={index} value={""+index}>{capitalizeFirstLetter(index)}</option>
  ))

  useEffect(()=>{
    const fetchData =async () =>{
      const result = await axios('http://localhost:8055/items/product?fields=title,price,id,surface,city.name,price,thumbnail,rooms,type.name')
      setData(result.data.data)
    }
    fetchData()
  },[])

  return (
    <>
      <div className='container mt-5 bg-light p-3 rounded'>
        <form className="row">
          <div className="col-xl-2 col-md-3 col-6">
              <label className="form-label ms-2">Type de bien: </label>
              <select className={"form-select "+invalidClassName} onChange={handleChangeProduct}>
              <option value="bien">Type de bien</option>
                  {selectGoods}
              </select>
              <p className="invalid-feedback">{messageFlash}</p>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <label className="form-label ms-2">Localisation: </label>
            <select className={"form-select "+invalidClassNameLoc} onChange={handleChangeCity}>
            <option value="localisation">Localisation</option>
              {selectCity}
            </select>
            <p className="invalid-feedback">{messageFlashLocalisation}</p>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <label className="form-label ms-2">Budjet min: </label>
            <input placeholder="Min" className="form-control" onChange={handleChangeValuePriceMin} type="number"/>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <label className="form-label ms-2">Budjet max: </label>
            <input placeholder="Max" className="form-control" onChange={handleChangeValuePriceMax} type="number"/>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <p>Nombres de pièces :</p>
            <div>
              <input className="form-check-input" onChange={handleRoomsValue} name="room"  type="radio" value="1"/>
              <label className="form-check-label me-2">1</label>
              <input className="form-check-input" onChange={handleRoomsValue} name="room"  type="radio" value="2"/>
              <label className="form-check-label me-2">2</label>
              <input className="form-check-input" onChange={handleRoomsValue} name="room"  type="radio" value="3"/>
              <label className="form-check-label me-2">3</label>
              <input className="form-check-input" onChange={handleRoomsValue} name="room"  type="radio" value="4"/>
              <label className="form-check-label me-2">4</label>
              <input className="form-check-input" onChange={handleRoomsValue} name="room"  type="radio" value="5"/>
              <label className="form-check-label me-2">5</label>
            </div>
          </div>
          <div className="col-xl-2 d-flex align-items-end justify-content-center col-md-4 col-6">
            <button onClick={handleButton} className='btn btn-success ps-3 pe-3'><i className="bi bi-search"></i> Chercher</button>
          </div>
          <h2 className='text-center mt-3 text-danger'>{emptyData}</h2>
        </form>
      </div>
      <h1 className='mt-5 ms-5 mb-5'>Nos biens</h1>
      <main>
        {card}
      </main>
    </>
  )
  
}

export default Search