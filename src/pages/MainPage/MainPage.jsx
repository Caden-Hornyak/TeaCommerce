import React, { useState, useEffect} from 'react';
import './MainPage.css';
import ShopCard from '../../components/ShopCard/ShopCard.jsx';
import SingleItem from '../../components/SingleItem/SingleItem.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import OrderItem from '../../components/OrderItem/OrderItem.jsx';
import Checkout from '../../components/Checkout/Checkout.jsx';
import LoginPage from '../Authentication/LoginPage.jsx';
import RegisterPage from '../Authentication/RegisterPage.jsx';

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
  }, [orders]);
  
  useEffect(() => {

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
      <div style={{overflowY: 'scroll', height: 'calc(100vh - 75px)'}}>
        {products.map(item => (
          <ShopCard key={item['ProductID']} item={item} setDisplay={setDisplay}/>
        ))}
      </div>}
      {display === 'order' &&
        <div className='orders-wrapper'>
          {orders.map(item => (
            <OrderItem key={item['OrderID']} item={item} setOrders={setOrders}/>
          ))}
        </div>
      }
      {display === 'checkout' &&
        <Checkout setOrders={setOrders} setDisplay={setDisplay}/>
      }
      {display === 'register' &&
        <RegisterPage setDisplay={setDisplay}/>
      }
      {display === 'login' &&
        <LoginPage setDisplay={setDisplay}/>
      }
      {typeof display === 'object' && <SingleItem item={display} setDisplay={setDisplay}/>}
    </>
  )
}

export default MainPage