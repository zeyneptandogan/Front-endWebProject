import React from 'react';
import UserStore from "./UserStore";



export function SetBasket(user_l) {

        fetch("http://localhost:8080/cart/getCart?userId=" + parseFloat(user_l), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                //console.log("List of Cart Items: ", json);

                UserStore.cartList = json.list;
                UserStore.cartTotal = json.totalPrice;
                //alert("Database Edited");

            }).catch((error) => {
            console.error(error);
        })

}