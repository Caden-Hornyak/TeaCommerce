import React, { useState, useEffect} from 'react';
import './MainPage.css';
import ShopCard from '../components/ShopCard';
import SingleItem from '../components/SingleItem';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState(null)

  useEffect(() => {
    fetch('http://localhost/teashop/php/get_products.php')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      {!display && products.map(item => (
        <ShopCard key={item['ProductID']} item={item} setDisplay={setDisplay}/>
      ))}
      {display && <SingleItem item={display} setDisplay={setDisplay}/>}
    </>
  )
}

export default MainPage