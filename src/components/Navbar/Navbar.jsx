import React from 'react';
import './Navbar.css';

const Navbar = ({ setDisplay }) => {
  return (
    <div className="navbar-wrapper">
        <button onClick={() => setDisplay('shop')}>Shop</button>
        <button onClick={() => setDisplay('order')}>Orders</button>
        <button onClick={() => setDisplay('checkout')}>Checkout</button>
    </div>
  )
}

export default Navbar