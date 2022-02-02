import React from 'react';
import "./AddressPage.css";


function SavedAddress(props){

    return(

        <button className="address-card place selectable" onClick={(e)=> props.onClick(e, props.card)}>

            <div className="address-card-info_">
                {props.card.full_address}
            </div>
            <div className="address-card-info">
                {props.card.type}
            </div>
            <div className="address-card-info">
                {props.card.postcode}
            </div>
        </button>
    );
}
export default SavedAddress;