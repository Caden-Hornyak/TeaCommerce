import React, {useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import './Checkout.css';
import { FaTrashAlt } from "react-icons/fa";
import Payment from '../Payment/Payment.jsx';


const Checkout = ({ setOrders }) => {

  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(null);
  const [payDisplay, setPayDisplay] = useState('checkout');


  const changeShoppingCart = (e, productID) => {
    if (isNaN(e.target.value)) return;

    const updatedCart = shoppingCart.map(([product, quantity]) => {
      if (product['ProductID'] === productID) {
        return [product, Number(e.target.value)];
      }
      return [product, quantity];
    });
    setShoppingCart(updatedCart);
  };

  const deleteItem = (item) => {
    setShoppingCart(prevState => {
      const newState = [];
      for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i]['ProductID'] !== item['ProductID']) {
          newState.append(shoppingCart[i])
        }
      }
      return newState;
    })
  };

  return (
    <>
      {payDisplay === 'checkout' && 
        <div className='checkout-wrapper'>
        <h2>Your Cart</h2>
        {shoppingCart.map(([product, number]) => {

          return (
            <div className='checkout-item' key={product['ProductID']}>
              <img src='/images/tea.jpg'></img>
              <div className='checkout-indcontainer'>
                <h4>{product['Product Name']}</h4>
              </div>
              <div className='checkout-indcontainer'>
                <h4>Price</h4>
                <p>{product['Price']}</p>
              </div>
              <div className='checkout-indcontainer'>
                <h4>Quantity</h4>
                <input
                  type="text"
                  onChange={e => changeShoppingCart(e, product['ProductID'])}
                  value={number}
                  style={{outline: 'none', marginBottom: '50px', marginTop: '0px', width: '50px'}}
                />
              </div>
              <div className='checkout-indcontainer'>
                <button className='checkout-trashbutton' onClick={product => deleteItem(product)}><FaTrashAlt /></button>
              </div>
            </div>
          );
        })}
        {shoppingCart.length === 0 ?
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <h4 style={{margin: '30px'}}>Your Shopping Cart Is Empty.</h4> 
          </div>
        :
          <div style={{display: 'flex', justifyContent: 'right'}}>
            <button className='checkout-checkoutbtn' onClick={() => setPayDisplay('payment')}>Check out</button>
          </div>
        }

        </div>
      }
      {payDisplay === 'payment' &&
        <Payment setOrders={setOrders}/>
      }
   </>
  )
}

export default Checkout