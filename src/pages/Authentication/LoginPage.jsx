import React, { useState, useEffect, useContext } from 'react'

import './Auth.css';
import { IoMdCheckmark } from "react-icons/io"
import { FaXmark } from "react-icons/fa6"
import { UserContext } from '../../UserContext';

const LoginPage = ({ setDisplay }) => {

  const { setUserDetails } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  let [attempted, setAttempted] = useState(false);
  
  const { username, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {

    e.preventDefault()

    fetch('http://localhost/teashop/php/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!('error' in data)) {
          setUserDetails(data);
          setDisplay('shop');
        } else {
          setAttempted(true);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      }
    );

  };

  return(
    <>
      <div id='login-page'>
  
        <img id="background" src='images/teabackground.png'></img>
        <div className='login-wrapper'>
          <h1>Login</h1>
          <form className='auth-form' onSubmit={e => onSubmit(e)} >
            {attempted && <p style={{margin: '0', color: 'red'}}>Username or password is incorrect</p>}
            <div className='form-group'>
              <input 
                className='form-control'
                type='text'
                placeholder='Username'
                name='username'
                onChange={e => onChange(e)}
                value={username}
                required
                />
                
            </div>
            <div className='form-group'>
              <input 
                className='form-control'
                type='password'
                placeholder='Password*'
                name='password'
                onChange={e => onChange(e)}
                value={password}
                minLength='6'
                required
                />
            </div>

            <button className='def-btn' type='submit' disabled={(!formData.password || !formData.username)}>Login</button>
          </form>
            <p>
                Don't have an account? <button onClick={() => setDisplay('register')} className='switchauthbtn'>Register</button>
            </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage