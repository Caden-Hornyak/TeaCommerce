import React, {useContext, useState} from 'react';
import { UserContext } from '../../UserContext';
import './Payment.css';

const Payment = ({setOrders, setDisplay}) => {

    const { shoppingCart } = useContext(UserContext);
    const [formData, setFormData] = useState({});

    const onFormChange = (e) => setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}));

    const submitForm = (e) => {
      e.preventDefault();

      fetch('http://localhost/teashop/php/create_order.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({formData: formData, shoppingCart: shoppingCart})
        })
        .then(response => response.json())
        .then(data => {
            setOrders(data);
            setDisplay('shop');
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        }
        );
      
    };

    return (
        <div className='payment-wrapper'>
            <form className='payment-form' onSubmit={e => submitForm(e)}>
                <h2>Contact</h2>
                <input placeholder='Email' name='email' onChange={e => onFormChange(e)}/>

                <h2>Delivery</h2>
                <input type='text' placeholder='Country' name='country' onChange={e => onFormChange(e)}/>
                <div>
                    <input type='text' placeholder='First Name' name='fname' onChange={e => onFormChange(e)}/>
                    <input type='text' placeholder='Last Name' name='lname' onChange={e => onFormChange(e)}/>
                </div>
                <input type='text' placeholder='State' name='state' onChange={e => onFormChange(e)}/>
                <input type='text' placeholder='Street' name='street' onChange={e => onFormChange(e)}/>
                <input type='text' placeholder='Phone' name='phone' onChange={e => onFormChange(e)}/>
                <div>
                    <input type='text' placeholder='Debit/Credit Number' name='debCredNumber' onChange={e => onFormChange(e)}/>
                    <input type='text' placeholder='CVC' name='cvc' onChange={e => onFormChange(e)}/>
                </div>
                <button type='submit' className='payment-paybtn'>Pay Now</button>
            </form>
            <div className='payment-ordersummary'>
                <h2>Order Summary</h2>
                <h4>Subtotal:</h4>
            </div>
            
        </div>
    )
}

export default Payment