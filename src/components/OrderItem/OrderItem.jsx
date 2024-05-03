import React, { useState } from 'react'
import './OrderItem.css';
import { FaTrashAlt } from "react-icons/fa";

const OrderItem = ({ item, setOrders }) => {

  const deleteItem = () => {

    fetch('http://localhost/teashop/php/delete_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ OrderID: item['OrderID']})
      })
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      }
    );
  };

  return (
    <div className='orderitem-wrapper'>
      <p>Date Ordered: <span style={{margin: '0px 15px', fontWeight: 'normal'}}>{item["Date Ordered"]}</span></p>
      <p>Total Price: <span style={{margin: '0px 15px', fontWeight: 'normal'}}>{item["Total Price"]}</span></p>
      <p>Status: <span style={{margin: '0px 15px', fontWeight: 'normal'}}>{item["Status"]}</span></p>
      <p>Order ID: <span style={{margin: '0px 15px', fontWeight: 'normal'}}>{item["OrderID"]}</span></p>
      <div className='checkout-indcontainer'>
        <button className='checkout-trashbutton' style={{alignSelf: 'start'}} onClick={() => deleteItem()}><FaTrashAlt /></button>
      </div>
    </div>
  )
}

export default OrderItem