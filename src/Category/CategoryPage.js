import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import './CategoryPage.css';
import {  Col, Row } from 'antd';
import CheckBox from './sections/CheckBox';
import RadioBox from "./sections/RadioBox";
import SearchFeature from "./sections/SearchFeature";
import { continents, price } from './sections/Datas';

import { useParams } from "react-router-dom";
import Products from "../Product/Products";
import Sort from "./sections/Sort";



function LandingPage(props) {

    const id = useParams();
    //console.log(id.key);
    let number = parseInt(id.key , 10 ) ;

    const [Products1, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(10)
    const [PostSize, setPostSize] = useState(10)
    const [SearchTerms, setSearchTerms] = useState("")
    const [selectSort, setSelectSort] = useState("")

    const [Filters, setFilters] = useState({
        continents: [[0]],
        price: []

    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
            filters: Filters
        }

        getProducts(variables)

    }, [id, setProducts])

    const getProducts = (variables) => {
        if(SearchTerms === "") {

            try {
                Axios.get(continents[number].subCategories[variables.filters.continents[0]].url)
                    .then(response => {
                        //console.log(response)
                        if (response.request.status === 200) {
                            if (variables.loadMore) {
                                setProducts([...Products1, ...response.data])

                            } else {
                                setProducts(response.data)
                            }
                            setPostSize(response.data.length)
                        } else {
                            alert('Failed to fetch product data')
                        }
                    })
            } catch (error) {
                alert('please select something!!!')
            }
        }
        else {
            try {
                Axios.get(continents[number].subCategories[variables.filters.continents[0]].url2 + SearchTerms)
                    .then(response => {
                        //console.log(response)
                        if (response.request.status === 200) {
                            if (variables.loadMore) {
                                setProducts([...Products1, ...response.data])
                            } else {
                                setProducts(response.data)
                            }
                            setPostSize(response.data.length)
                        } else {
                            alert('Failed to fetch product data')
                        }
                    })
            } catch (error) {
                alert('please select something!!!')
            }
        }

    }



    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,

        }
        getProducts(variables)
        setSkip(skip)
    }


    const renderCards = Products1.map((product, index) => {
        //console.log("PRICE" ,product.currentPrice)
       if(!Filters.price.length) {
        return (
            <Products
                product =  {product}
            />)

       }
       else if(Filters.price[0] <= product.currentPrice && Filters.price[1] >= product.currentPrice){
           return (
               <Products
                   product =  {product}
               />)

       }
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        //console.log(variables.filters)
        //console.log(variables.filters.continents[0])
        getProducts(variables)
        setSkip(0)

    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
            sort: selectSort
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    const updateSort = (newSortItem) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: SearchTerms,
            sort: newSortItem
        }

        setSkip(0)
        setSelectSort(newSortItem)

        getProducts(variables)
    }

    Products1.sort((a, b) => {
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



    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        //console.log('array', array)
        return array
    }


    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues

        }


        //console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }




    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>



            {/* Filter  */}

            <Row>
                <Col span={12}  >
                    <CheckBox
                        list={continents[number].subCategories}
                        handleFilters={filters => handleFilters(filters, "continents")}
                    />
                </Col>
                <Col span={12} >
                    <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    />
                </Col>
            </Row>
            <br />
            <div>
            <div style={{ display: 'flex', margin: '1rem auto' ,float: 'left' }}>

                <Sort
                    refreshFunction={updateSort}
                />

            </div>

            <div style={{ display: 'flex',  margin: '1rem auto' ,float: 'right'}}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>
            </div>
            <br /><br /><br /><br />
            {Products1.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :

                <div style={{paddingLeft: '100px'}}>

                    <div className="home__row2">

                        {renderCards}

                    </div>


                </div>
            }
            <br /><br />



        </div>
    )
}

export default LandingPage