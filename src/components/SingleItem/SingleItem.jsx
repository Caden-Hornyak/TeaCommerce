import React, {useContext} from 'react';
import { UserContext } from '../../UserContext';
import './SingleItem.css';

const SingleItem = ({ item, setDisplay }) => {

    const { shoppingCart, setShoppingCart } = useContext(UserContext);

    const addToCart = () => {
        let found = false;
        for (let i = 0; i < shoppingCart.length; i++) {
            if (item === shoppingCart[i][0]) {
                shoppingCart[i][1]++;
                found = true;
                break;
            }
        }

        if (!found) {
            setShoppingCart(prevState => [...prevState, [item, 1]]);
        }
        setDisplay('checkout');
    };

    return (
        <div className='singleitem-wrapper'>
            <img src={'/images/tea.jpg'} />
            <div className='singleitem-infoblock'>
                <h1>{item["Product Name"]}</h1>
                <h2>${item["Price"]} USD</h2>
                <button onClick={addToCart} className='singleitem-addtocart'>Add to Cart</button>
                <p>{item["Description"]}</p>
            </div>
        </div>
    )
}

export default SingleItem