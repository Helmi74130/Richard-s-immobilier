import './App.css';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom'
import OurProducts from './pages/OurProducts';
import Product from './pages/Product';
import LocationProducts from './pages/LocationProducts';




function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/NosBiens' element={<OurProducts/>}/>
      <Route path='/locations' element={<LocationProducts/>}/>
      <Route path='/contact' element={<Product/>}/>
      <Route path='/produit/:id' element={<Product/>}/>
    </Routes>
    </>
  );
}

export default App;
