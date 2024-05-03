import React from 'react';
import './ShopCard.css';

const ShopCard = ({ item, setDisplay }) => {
  return (
    <div className='shopcard-wrapper' onClick={() => setDisplay(item)}>
        {/* <img src={teaPicture}></img> */}
        <h2>{item["Product Name"]}</h2>
        <h5>{item["Stock"]} left in stock.</h5>
        <h2>${item["Price"]} USD</h2>
    </div>
  )
}

export default ShopCard