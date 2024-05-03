import React, {useContext} from 'react';
import './Navbar.css';
import { UserContext } from '../../UserContext';

const Navbar = ({ setDisplay }) => {
  const { userDetails } = useContext(UserContext);
  return (
    <div className="navbar-wrapper">
        <button onClick={() => setDisplay('shop')}>Shop</button>
        <button onClick={() => setDisplay('order')}>Orders</button>
        <button onClick={() => setDisplay('checkout')}>Checkout</button>
        {(userDetails === null || 'error' in userDetails) ?
          <button onClick={() => setDisplay('register')}>Register</button>
        :
        <>
        {console.log(userDetails)}
          <h2>{userDetails['username']}</h2>
          <button onClick={() => setDisplay('shop')}>Log Out</button>
        </>
        }
        
    </div>
  )
}

export default Navbar