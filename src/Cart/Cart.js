import React, {useEffect, useState} from "react";
import "./Cart.css";
import Subtotal from "./Subtotal";
import  "../Product/CartProduct.css";
import UserStore from "../Login-SignUp/UserStore";
import ReactStars from "react-rating-stars-component";
import {SetBasket} from "../Login-SignUp/SetBasket";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

function Checkout() {

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        setBasket();
    },[])

    const setBasket = () => {
        fetch("http://localhost:8080/cart/getCart?userId=" + parseFloat(UserStore.userId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                //console.log("List of Cart Items: ", json);
                setCart(json.list);
                SetBasket(UserStore.userId);

            }).catch((error) => {
            console.error(error);
        })
    }

    function handleClick() {
        fetch("http://localhost:8080/cart/clear?userId=" + parseFloat(UserStore.userId) , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((response) => response.json())
            .then((json) => {
                //console.log("List of Cart Items: ", json);
                setBasket();
                UserStore.cartList = json;
                UserStore.cartTotal = 0;
                //alert("Database Edited");

            }).catch((error) => {
            console.error(error);
        })

    }

    function CheckoutProduct({ id, title, writer,image, current_price, rating, stock, quantity, hideButton}) {




        const removeFromBasket = () => {
            // remove the item from the basket
            fetch("http://localhost:8080/cart/DecrementProduct?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(id) +  "&quantity=" + quantity, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }).then((response) => response.json())
                .then((json) => {
                    //console.log("List of Cart Items: ", json);
                    setBasket();
                    UserStore.cartList = json.list;
                    UserStore.cartTotal = json.totalPrice;
                    //alert("Database Edited");

                }).catch((error) => {
                console.error(error);
            })



        }

        const decreaseFromBasket = () => {
            fetch("http://localhost:8080/cart/DecrementProduct?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(id) +  "&quantity=1", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }).then((response) => response.json())
                .then((json) => {
                    //console.log("List of Cart Items: ", json);
                    setBasket();
                    UserStore.cartList = json.list;
                    UserStore.cartTotal = json.totalPrice;
                    //alert("Database Edited");

                }).catch((error) => {
                console.error(error);
            })


        }

        const increaseFromBasket = () => {
            fetch("http://localhost:8080/cart/IncrementProduct?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(id) +  "&quantity=1", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }).then((response) => response.json())
                .then((json) => {
                    //console.log("List of Cart Items: ", json);
                    setBasket();
                    UserStore.cartList = json.list;
                    UserStore.cartTotal = json.totalPrice;
                    //alert("Database Edited");

                }).catch((error) => {
                console.error(error);
            })


        }





        return (
            <div className='checkoutProduct'>
                <img className='checkoutProduct__image' src={image} />

                <div className='checkoutProduct__info'>
                    <p className='checkoutProduct__title'>{title}</p>
                    <p className='checkoutProduct__writer'>{writer}</p>
                    <p className="checkoutProduct__price">
                        <small>$</small>
                        <strong>{current_price}</strong>
                    </p>



                    <div className='btns-container'>

                        <Controls.ActionButton
                            color="secondary"
                            onClick={increaseFromBasket}
                            disabled={stock <= quantity}
                        >
                            <AddIcon fontSize="small"/>
                        </Controls.ActionButton>
                    </div>

                    <div className="btns-container">
                        <p className="quan">{quantity}</p>
                    </div>

                    <div className="btns-container">
                        {
                            !hideButton && (
                                <Controls.ActionButton
                                    color="secondary"
                                    onClick={decreaseFromBasket}
                                >
                                    <RemoveIcon fontSize="small"/>
                                </Controls.ActionButton>)
                        }

                    </div>

                    <div className="btns-container">
                        <p className="quan"></p>
                    </div>

                    <div className="btns-container">
                        {
                            !hideButton && (<Controls.ActionButton
                                    color="secondary"
                                    onClick={removeFromBasket}
                                >
                                    <DeleteIcon fontSize="small"/>
                                </Controls.ActionButton>
                            )
                        }

                    </div>


                </div>
            </div>
        )
    }


    return (

        <div className="checkout">
            <div className="checkout__left">


                <div>
                    <h2 className="checkout__title">Your Shopping Basket</h2>

                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.productId}
                            title={item.productName}
                            writer={item.writer}
                            image={item.imgUrl}
                            current_price={item.currentPrice}
                            stock={item.currentStock}
                            quantity={item.quantity}
                        />
                    ))}

                </div>
                {
                    cart.length > 0 &&
                    <button className="btns" onClick={handleClick}>Clear Basket</button>
                }


            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;