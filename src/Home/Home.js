import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { HashLink as Link } from 'react-router-hash-link';
import Products from "../Product/Products";
import "./Home.css";

import Footer from "../Header-Footer/Footer";
import Header from "../Header-Footer/Header";


function Home(){
    const [NewComerList,setNewComerList] = useState([]);
    const[bestsellers,setBestsellers]=useState([]);
    const[discounts,setDiscounted]=useState([]);

    useEffect(()=>{
        getNewComerProductsfromAPI();
    },[]);
    useEffect(()=>{
        getBestsellerProductsfromAPI();
    },[]);
    useEffect(()=>{
        getDiscountedProductsfromAPI();
    },[]);


    const getNewComerProductsfromAPI = async () => {
        return fetch('http://localhost:8080/product/recentlyPublished',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("List of New Comers: ", json);
                setNewComerList(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const getBestsellerProductsfromAPI = async () => {
        return fetch('http://localhost:8080/product/runningOut',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                Accept: 'application/json',
            },
        })
            .then((response2) => response2.json())
            .then((json) => {
                //console.log("List of Bestsellers: ", json);
                setBestsellers(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const getDiscountedProductsfromAPI = async () => {
        return fetch('http://localhost:8080/product/highestDiscount',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                Accept: 'application/json',
            },
        })
            .then((response3) => response3.json())
            .then((json) => {
                //console.log("List of Bestsellers: ", json);
                setDiscounted(json);
            }).catch((error) => {
                console.error(error);
            });
    };



    return (
        <>
            <Header/>
            <html>
            <div className="carousel-wrapper">
                <Carousel infiniteLoop useKeyboardArrows autoPlay >
                    <div>
                        <Link to="#bestsellers">
                            <div className="scroll">
                                <img src="images/2.jpg"/>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="#newcomers">
                            <div>
                                <img src="images/6.jpg"/>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to="#discounted">
                            <div>
                                <img src="images/4.jpg"/>
                            </div>
                        </Link>
                    </div>
                </Carousel>
            </div>
            <div id="newcomers">
            <h1 className="heading"><span>New Arrivals</span></h1>
            </div>

            <div className="home__row">
                {NewComerList.map((product) =>
                    <div className="product_padding" key={product.id}>
                        <Products
                            product={product}

                        />
                    </div>
                )}
            </div>

            <div id="bestsellers">
            <h1 className="heading"><span>Bestsellers</span></h1>
            </div>

            <div className="home__row">
                {bestsellers.map((product) =>
                    <div className="product_padding" key={product.id}>
                        <Products
                            product={product}
                        />
                    </div>
                )}
            </div>

            <div id="discounted">
            <h1 className="heading"><span>Highest Discounts</span></h1>
            </div>

            <div className="home__row">
                {discounts.map((product) =>
                    <div className="product_padding" key={product.id}>
                        <Products
                            product={product}
                        />
                    </div>
                )}
            </div>
            </html>
            <Footer/>
        </>)

}
export default Home;