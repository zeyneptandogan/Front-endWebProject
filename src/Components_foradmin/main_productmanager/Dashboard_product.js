
import React, {useEffect, useState} from "react";
import Charts from "../charts_productmanager/Charts";
import BarChart from "../charts_productmanager/BarChart";
import PieChart from "../charts_productmanager/PieChart";
import "../main_salesmanager/Dashboard.css";

function Dashboard_product(){
    const [Useramount,setUseramount] = useState([]);
    const[Productamount,setProductamount]=useState([]);
    const[Companyamount,setCompanyamount]=useState([]);
    const[Commentamount,setCommentamount]=useState([]);
    const [commentnumbycategory,setcommentnumbycategory] = useState([]);
    const [commentsbystatus,setcommentsbystatus] = useState([]);
    const [productbycategory,setproductbycategory] = useState([]);
    const [order,setOrder] = useState([]);

    useEffect(()=>{
        getUseramountfromAPI();
    },[]);
    useEffect(()=>{
        getProductamountfromAPI();
    },[]);
    useEffect(()=>{
        getCompanyamountfromAPI();
    },[]);
    useEffect(()=>{
        getCommentamountfromAPI();
    },[]);
    useEffect(()=>{
        getcommentnumbycategoryfromAPI();
    },[]);
    useEffect(()=>{
        getcommentsbystatusfromAPI();
    },[]);
    useEffect(()=>{
        getproductbycategoryfromAPI();
    },[]);
    useEffect(()=>{
        getorderfromAPI();
    },[]);

    const getproductbycategoryfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getAllProductbyCategory',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("hellodd", json);
                setproductbycategory(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const getorderfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getOrderGraph',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("helloo:", json);

                setOrder(json);
                console.log(order)
            }).catch((error) => {
                console.error(error);
            });
    };

    const getUseramountfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getUserNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("user amount:", json);
                setUseramount(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getProductamountfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getProductNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("product amount: ", json);
                setProductamount(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getCompanyamountfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getDistributorNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("company amount: ", json);
                setCompanyamount(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getCommentamountfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getCommentNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment amount: ", json);
                setCommentamount(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getcommentnumbycategoryfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getCommentsCategory',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment by category:", json);
                setcommentnumbycategory(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getcommentsbystatusfromAPI =  () => {
         fetch('http://localhost:8080/productManager/getCommentStatus',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment by status:", json);
                setcommentsbystatus(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    //not: burada category lere göre ürün sayısı ve son 30 günde olan order sayıları line chart eksik

    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    <img src="/images/salesmanager.svg" alt="salesmanager"/>
                    <div className="main__greeting">
                        <h1>Hello Product Manager</h1>
                        <p>Welcome to your admin dashboard</p>
                    </div>
                </div>
                <div className="main__cards">
                    <div className="card_admin">
                        <i className="fa fa-user fa-2x text-lightblue">
                        </i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of users</p>
                            <span className="font-bold text-title">{Useramount}</span>  {/*buraya user sayısı konacak*/}
                        </div>
                    </div>
                    <div className="card_admin">
                        <i className="fa fa-book fa-2x text-red"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of products</p>
                            <span className="font-bold text-title">{Productamount}</span>
                        </div>
                    </div>
                    <div className="card_admin">
                        <i className="fa fa-building fa-2x text-green"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of company</p>
                            <span className="font-bold text-title">{Companyamount}</span>
                        </div>
                    </div>
                    <div className="card_admin">
                        <i className="fa fa-comment fa-2x text-yellow"></i>
                        <div className="card_inner">
                            <p className="text-primary-p">Number of comments</p>
                            <span className="font-bold text-title">{Commentamount}</span>
                        </div>
                    </div>
                </div>
                <div className="charts">
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Amount of orders</h1>
                                <p>Last 10 days</p>
                            </div>
                            <i className="fa fa-address-card"></i>
                        </div>
                        <Charts
                            order={order}/>
                    </div>
                    <div className="charts__right">
                        <div className="charts__right__title">
                            <div>
                                <h1>Items by category</h1>
                                <p>Istanbul,Turkey</p>
                            </div>
                            <i className="fa fa-window-restore"></i>
                        </div>
                        <div className="charts__right__cards">
                            <div className="card1">
                                <h1>Novel</h1>
                                <p>{productbycategory.novel_num}</p>
                            </div>
                            <div className="card2">
                                <h1>Poetry</h1>
                                <p>{productbycategory.poetry_num}</p>
                            </div>
                            <div className="card3">
                                <h1>Story</h1>
                                <p>{productbycategory.story_num}</p>
                            </div>
                            <div className="card4">
                                <h1>Biography</h1>
                                <p>{productbycategory.biography_num}</p>
                            </div>
                        </div>
                        <div className="charts__right__cards_center">
                            <div className="card5">
                                <h1>Cookbooks</h1>
                                <p>{productbycategory.cookbook_num}</p>
                            </div>
                        </div>
                    </div>
                    <div className="charts__left">
                        <div className="charts__left__title">
                            <div>
                                <h1>Distribution of comments</h1>
                                <p>by categories</p>
                            </div>
                            <i className="fa fa-address-card"></i>
                        </div>
                        <BarChart
                         comment={commentnumbycategory}
                        />
                    </div>
                    <div className="charts__right">
                        <div className="charts__right__title">
                            <div>
                                <h1>Distribution of comments</h1>
                                <p>According to their status</p>
                            </div>
                            <i className="fa fa-address-card"></i>
                        </div>
                        <PieChart
                        comment={commentsbystatus}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Dashboard_product;