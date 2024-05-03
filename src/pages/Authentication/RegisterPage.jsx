import React, { useState, useEffect } from 'react'
import './Auth.css';
import { IoMdCheckmark } from "react-icons/io"
import { FaXmark } from "react-icons/fa6"

const Register = ({ setDisplay }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rePassword: ''
    });

    let { username, password, rePassword } = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {

      e.preventDefault();

      if (password === rePassword) {

        fetch('http://localhost/teashop/php/register.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(data => {
            
            if ('success' in data) {
              setDisplay('login');
            }
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          }
        );

      } else {
        alert("Normal Passwords do Not Match");
      }

    }

    return(
      <div id='register-page'>
        <img id="background" src='images/teabackground.png'></img>
        <div id='register-form-wrapper'>
          <div className='register-wrapper'>
            <h1>Register</h1>
            <form className='auth-form' onSubmit={e => {onSubmit(e); return false}}>
              <div className='register-inputs'>

              </div>
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
              <div className='form-group'>
                <input 
                  className='form-control'
                  type='password'
                  placeholder='Confirm Password*'
                  name='rePassword'
                  onChange={e => onChange(e)}
                  value={rePassword}
                  minLength='6'
                  required
                  />
                <input className='form-control' id='register-formdetails' placeholder='Email' name='email' onChange={e => onChange(e)}/>
                <div className='register-dualinput'>
                    <input className='form-control' type='text' placeholder='First Name' name='fname' onChange={e => onChange(e)}/>
                    <input className='form-control' type='text' placeholder='Last Name' name='lname' onChange={e => onChange(e)}/>
                </div>
                <div className='register-dualinput'>
                  <input className='form-control' type='text' placeholder='Street' name='street' onChange={e => onChange(e)}/>
                  <input className='form-control' type='text' placeholder='State' name='state' onChange={e => onChange(e)}/>
                  <input className='form-control' type='text' placeholder='Country' name='country' onChange={e => onChange(e)}/>
                </div>
                <input className='form-control' type='text' placeholder='Phone' name='phone' onChange={e => onChange(e)}/>

              </div>
              <button className='def-btn' type='submit' disabled={(!formData.password || !formData.rePassword || !formData.username)}>Register</button>
                
            </form>
            <p>
              Already have an account? <button onClick={() => setDisplay('login')} className='switchauthbtn'>Sign In</button>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Register