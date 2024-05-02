import React, { useState, useEffect} from 'react';
import './MainPage.css';
import ShopCard from '../components/ShopCard/ShopCard';
import SingleItem from '../components/SingleItem/SingleItem';
import Navbar from '../components/Navbar/Navbar';
import OrderItem from '../components/OrderItem/OrderItem.jsx';
import Checkout from '../components/Checkout/Checkout.jsx';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState('shop');
  
  useEffect(() => {
    fetch('http://localhost/teashop/php/get_products.php')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    fetch('http://localhost/teashop/php/get_orders.php')
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
    });
  }, []);

  return (
    <>
      <Navbar setDisplay={setDisplay}/>
      {display === 'shop' && 
      <>
        {products.map(item => (
          <ShopCard key={item['ProductID']} item={item} setDisplay={setDisplay}/>
        ))}
      </>}
      {display === 'order' &&
        <div className='orders-wrapper'>
          {orders.map(item => (
            <OrderItem key={item['OrderID']} item={item} setOrders={setOrders}/>
          ))}
        </div>
      }
      {display === 'checkout' &&
        <Checkout setOrders={setOrders}/>
      }
      {typeof display === 'object' && <SingleItem item={display} setDisplay={setDisplay}/>}
    </>
  )
}

export default MainPage