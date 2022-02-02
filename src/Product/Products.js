import React, {useEffect, useState} from 'react';
import "./Products.css";
import {Link} from "react-router-dom";
import UserStore from "../Login-SignUp/UserStore";
import {SetBasket} from "../Login-SignUp/SetBasket";


function Products(props){

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

            }).catch((error) => {
            console.error(error);
        })
    }


    const[rating,setRating]=useState(0);

    useEffect(()=>{
        getRatingfromAPI();
    },[props.product.productId, setRating]);

    const getRatingfromAPI = async () => {
        return fetch('http://localhost:8080/rate/getRate?productId=' + props.product.productId,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                Accept: 'application/json',
            },
        })
            .then((response3) => response3.json())
            .then((json) => {
                //console.log("Rating ", json);
                setRating(json);
            }).catch((error) => {
                console.error(error);
            });
    };



    const example = {
        size: 15,
        count: 5,
        color: "black",
        activeColor: "orange",
        value: rating,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        edit: false,

    };


    const addToBasket = () => {
        fetch("http://localhost:8080/cart/addToCart?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(props.product.productId) +  "&quantity=1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            //console.log(result,"buradayım");
            if(result.ok){
                SetBasket(UserStore.userId);
                setBasket();
                //alert("Added");
            } else {
                if(result.status === 400){
                    alert("Error Wrong operation");
                } else {
                    alert("Error Something went wrong!");
                }
            }
        })

    };
    const increaseQuantity = () => {
        fetch("http://localhost:8080/cart/IncrementProduct?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(props.product.productId) +  "&quantity=1", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

                'Accept': 'application/json',
            },
        }).then((result) => {
            //console.log(result,"buradayım2");
            if(result.ok){
                SetBasket(UserStore.userId);
                setBasket();
                //alert("More Added");
            } else {
                if(result.status === 400){
                    alert("Error Wrong operation");
                } else {
                    alert("Error Something went wrong!");
                }
            }
        })


    };

    const isInCart = (product, basket) => {

        return basket.find((item) => item.productId === product.productId);
    }


    //console.log(props.product.currentStock)
    if(props.product.currentPrice!==props.product.initialPrice){
        return(

            <>

                <div className="card">
                    <div className="imgBx">
                        <Link className="lnk" key={props.product.productId} to={'/product_detail/'+ props.product.productId}>
                            <img className="image_Card" src={props.product.imgUrl} alt="" width="100" height="200" />
                        </Link>
                    </div>
                    <div className="contentBx">
                        <Link className="lnk" key={props.product.productId} to={'/product_detail/'+ props.product.productId}>
                            <h3>{props.product.productName}</h3>
                        </Link>
                        <h2>{props.product.writer}</h2>
                        <strong className="price"> ₺{props.product.currentPrice} <span>  ₺{props.product.initialPrice}</span> </strong>

                    </div>
                    {props.product.currentStock === 0 &&
                        <p className="contentBx2">
                            <span>Sold Out!!!</span>
                        </p>
                    }
                    {!isInCart(props.product, cart) && props.product.currentStock !== 0 &&
                        <button onClick={addToBasket} className="btn3 primary" >Add to basket</button>
                    }
                    {isInCart(props.product, cart) && props.product.currentStock !== 0 &&
                        <button disabled={cart.find((item) => item.productId === props.product.productId).quantity >= props.product.currentStock}
                                onClick={increaseQuantity} className="btn3 primary" >Add more</button>
                    }

                </div>

            </>
        )
    }
    else{
        return (
            <>
                <div className="card">
                    <div className="imgBx">
                        <Link className="lnk" key={props.product.productId} to={'/product_detail/'+ props.product.productId}>
                            <img className="image_Card" src={props.product.imgUrl} alt="" width="100" height="200" />
                        </Link>
                    </div>
                    <div className="contentBx">
                        <Link className="lnk" key={props.product.productId} to={'/product_detail/'+ props.product.productId}>
                            <h3>{props.product.productName}</h3>
                        </Link>
                        <h2>{props.product.writer}</h2>
                        <strong className="price_notdiscount"> ₺{props.product.currentPrice}</strong>


                    </div>
                    {props.product.currentStock === 0 &&
                    <p className="contentBx2">
                        <span>Sold Out!!!</span>
                    </p>
                    }
                    {!isInCart(props.product, cart) && props.product.currentStock !== 0 &&
                    <button onClick={addToBasket} className="btn3 primary" >Add to basket</button>
                    }
                    {isInCart(props.product, cart) && props.product.currentStock !== 0 &&
                    <button disabled={cart.find((item) => item.productId === props.product.productId).quantity >= props.product.currentStock}
                            onClick={increaseQuantity} className="btn3 primary" >Add more</button>
                    }
                </div>
            </>
        );
    }
}
export default Products;