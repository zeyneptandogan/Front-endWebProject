import React from 'react';
import "./CheckoutPage.css";


function SavedCards(props){
    return(
        <button className="credit-card visa selectable" onClick={(e)=> props.onClick(e, props.creditcards)} >
            <div className="credit-card-last4">
                ************{props.creditcards.creditcard_number.substring(12,16)}
            </div>
            <div className="credit-card-expiry">
                {props.creditcards.end_date}
            </div>
        </button>
    );
}
export default SavedCards;