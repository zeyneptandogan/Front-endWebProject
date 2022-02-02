import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";


import Products from "../Product/Products";
import "./Home.css";

import Footer from "../Header-Footer/Footer";
import Header from "../Header-Footer/Header";


import {useParams} from "react-router-dom";
import Sort from "../Category/sections/Sort";
import Bigger_product from "../Product/CartProduct";

function Search(){
    const [SearchList,setSearchList] = useState([]);
    const [selectSort, setSelectSort] = useState("")



    const id = useParams();
    //console.log(id.input);
    useEffect(()=>{
        getSearchResultsfromAPI();
    },[id, setSearchList]);

    const getSearchResultsfromAPI = async () => {
        return fetch('http://localhost:8080/product/getProductsBySearch?search=' + id.input,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log("Results: ", json);
                setSearchList(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const updateSort = (newSortItem) => {

        setSelectSort(newSortItem)

    }

    SearchList.sort((a, b) => {
        if(selectSort === "Lowest"){
            return parseFloat(a.currentPrice) - parseFloat(b.currentPrice)
        }
        else if(selectSort === "Highest"){
            return parseFloat(b.currentPrice) - parseFloat(a.currentPrice)
        }
        else if(selectSort === "Most Popular"){
            return parseInt(a.currentStock) - parseInt(b.currentStock)
        }
        else if(selectSort === "Least Popular"){
            return parseInt(b.currentStock) - parseInt(a.currentStock)
        }
        else if(selectSort === "A-Z"){
            return a.productName.localeCompare(b.productName)
        }
        else if(selectSort === "Z-A"){
            return b.productName.localeCompare(a.productName)
        }
    })




    return (
        <>
            <Header/>

            <h1 className="heading2"><span>Search Results</span></h1>
            <div style={{ padding:'20px' ,display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' ,float: 'right' }}>

                <Sort
                    refreshFunction={updateSort}
                />

            </div>
<br/><br/><br/><br/><br/>
            <div className="home__row2">
                {SearchList.map((product) =>
                    <div style={{paddingLeft: '100px'}} className="product_padding" key={product.id}>
                        <Bigger_product
                            product={product}

                        />
                    </div>
                )}
            </div>

            <Footer/>
        </>)

}
export default Search;