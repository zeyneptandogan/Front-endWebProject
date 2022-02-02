import React, {useEffect, useState} from 'react';
import './DetailPage.css';
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Header from "../Header-Footer/Header";
import CommentBox from "../Comment/CommentBox";
import Footer from "../Header-Footer/Footer";
import {useParams} from "react-router-dom";
import UserStore from "../Login-SignUp/UserStore";
import {SetBasket} from "../Login-SignUp/SetBasket";


function DetailPage(){

    const id = useParams();
    //console.log(id.product_id);
    //let number = parseInt(id.product_id , 10 ) ;

    const[products,setProducts]=useState([]);

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



    useEffect(()=>{
        getOneProductfromAPI();
    },[]);

    const getOneProductfromAPI = async () => {
        return fetch('http://localhost:8080/product/getProduct?productId=' + id.product_id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then(json => {
                //console.log("BOOK: ", json);
                setProducts(json);
            }).catch((error) => {
                console.error(error);
            });
    };


    /*const[rating,setRating]=useState(0);

    useEffect(()=>{
        getRatingfromAPI();
    },[id, setRating]);

    const getRatingfromAPI = async () => {
        return fetch('http://localhost:8080/rate/getRate?productId=' + id.product_id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Basic dWxhc2VyYXNsYW5Ac2FiYW5jaXVuaXYuZWR1OmFkbWludWxhcw==',
                Accept: 'application/json',
            },
        })
            .then((response3) => response3.json())
            .then((json) => {
                console.log("Rating ", json);
                setRating(json);
            }).catch((error) => {
                console.error(error);
            });
    };*/

    const addToBasket = () => {
        fetch("http://localhost:8080/cart/addToCart?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(products.productId) +  "&quantity=1", {
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
        // dispatch the item into the data layer

    };

    const increaseQuantity = () => {
        fetch("http://localhost:8080/cart/IncrementProduct?userId=" + parseFloat(UserStore.userId) +"&productId=" + parseFloat(products.productId) +  "&quantity=1", {
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




        const example = {
            size: 20,
            count: 5,
            color: "black",
            activeColor: "orange",
            value: products.avg,
            a11y: true,
            isHalf: true,
            emptyIcon: <i className="far fa-star" />,
            halfIcon: <i className="fa fa-star-half-alt" />,
            filledIcon: <i className="fa fa-star" />,
            edit: false,
        };
        return(
            <>
                <Header/>
            <div className="detailpage">


                        <div className="details" key={products.productId}>
                            <div className="big-img">
                                <img src={products.imgUrl} alt=""/>
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{products.productName}</h2>
                                </div>
                                <div className="product__rating">
                                   <ReactStars {...example}/>
                                </div>


                                <p>{products.writer}</p>
                                <p>{products.distributor}</p>
                                <p>{products.description}</p>

                                {products.currentPrice === products.initialPrice ?

                                <p className="price_notdiscount">
                                    <strong>₺{products.currentPrice}</strong>
                                </p> :
                                    <strong className="price">  <span>  ₺{products.initialPrice}</span> ₺{products.currentPrice} </strong>
                                }

                                {products.currentStock <= 5 && products.currentStock >0 && (
                                    <p className="row">
                                        <span>Running Out!!!</span>
                                    </p> )
                                }
                                {products.currentStock === 0 &&
                                    <p className="row">
                                        <span>Sold Out!!!</span>
                                    </p>
                                }
                                {!isInCart(products, cart) && products.currentStock !== 0 &&
                                <button onClick={addToBasket} className="cart" >Add to basket</button>
                                }
                                {isInCart(products, cart) && products.currentStock !== 0 &&
                                <button disabled={cart.find((item) => item.productId === products.productId).quantity >= products.currentStock}
                                        onClick={increaseQuantity} className="cart" >Add more</button>
                                }



                                

                            </div>
                        </div>


            </div>
                <CommentBox p_id={id.product_id}/>
                <Footer/>
            </>
        );

}

export default DetailPage;