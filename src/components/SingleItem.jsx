import React from 'react';
import './SingleItem.css';

const SingleItem = ({ item }) => {

    const addToCart = () => {
        
    };

    return (
        <div className='singleitem-wrapper'>
            <img src={'/images/tea1.avif'} />
            <div className='singleitem-infoblock'>
                <h1>{item["Product Name"]}</h1>
                <h2>{item["Price"]}</h2>
                <button onClick={addToCart}>Add to Cart</button>
                <p>{item["Description"]}</p>
            </div>
        </div>
    )
}

export default SingleItem