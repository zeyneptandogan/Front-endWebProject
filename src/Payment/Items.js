import React from 'react';
import "./CheckoutPage.css";


function Items_element(props){
    return(
        <div className="item">
            <div className="price">{props.item.currentPrice}$ * {props.item.quantity}</div>
            <p className="item-name">{props.item.productName}</p>
        </div>
    );
}
export default Items_element;