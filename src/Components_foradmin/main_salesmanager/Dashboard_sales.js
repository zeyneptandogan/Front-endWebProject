import React, {useEffect, useState} from "react";
import LineChart1 from "../charts_salesmanager/LineChart1";
import LineChart2 from "../charts_salesmanager/LineChart2";
import BarChart from "../charts_salesmanager/BarChart";
import PieChart from "../charts_salesmanager/PieChart";
import "./Dashboard.css";

function Dashboard_sales(){
    const [Useramount,setUseramount] = useState([]);
    const[Productamount,setProductamount]=useState([]);
    const[Companyamount,setCompanyamount]=useState([]);
    const[Commentamount,setCommentamount]=useState([]);
    const [revenuebycategory,setrevenuebycategory] = useState([]);   //
    const [dailyrevenue,setdailyrevenue] = useState([]);
    const [dailyprofit,setdailyprofit] = useState([]);
    const [discount,setdiscount] = useState([]);

    useEffect(()=>{
        getUseramountfromAPI();
        getdailyprofitfromAPI();
        getdailyrevenuefromAPI();
        getrevenuebycategoryfromAPI();
        getCommentamountfromAPI();
        getCompanyamountfromAPI();
        getProductamountfromAPI();
    },[]);


   useEffect(()=>{
        getdiscountedfromAPI();
    },[]);



    const getdailyrevenuefromAPI =  () => {   //
        return fetch('http://localhost:8080/salesManager/getDailyRevenue',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("daily revenue", json);
                setdailyrevenue(json);

            }).catch((error) => {
                console.error(error);
            });
    };

    const getdailyprofitfromAPI =  () => {   //
        return fetch('http://localhost:8080/salesManager/getDailyProfit',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("daily profit:", json);

                setdailyprofit(json);

            }).catch((error) => {
                console.error(error);
            });
    };

    const getUseramountfromAPI =  () => { //
        return fetch('http://localhost:8080/salesManager/getUserNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

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
    const getProductamountfromAPI =  () => { //
        return fetch('http://localhost:8080/salesManager/getProductNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

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
    const getCompanyamountfromAPI =  () => {  //
        return fetch('http://localhost:8080/salesManager/getDistributorNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

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
    const getCommentamountfromAPI =  () => {   //
        return fetch('http://localhost:8080/salesManager/getCommentNum',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

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
    const getrevenuebycategoryfromAPI =  () => { //
        return fetch('http://localhost:8080/salesManager/getCategoryRevenue',{
            method: 'GET',
            headers: {

                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("revenue by category:", json);
                setrevenuebycategory(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getdiscountedfromAPI = async () => {   //buraya discounted ürün miktarlarını çektiğimiz url gelecek
        return fetch('http://localhost:8080/productManager/discountedCategory',{
            method: 'GET',
            headers: {

                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment by status:", json);
                setdiscount(json);
            }).catch((error) => {
                console.error(error);
            });
    };


        return (
            <main>
                <div className="main__container">
                    <div className="main__title">
                        <img src="/images/salesmanager.svg" alt="salesmanager"/>
                        <div className="main__greeting">
                            <h1>Hello Sales Manager</h1>
                            <p>Welcome to your admin dashboard</p>
                        </div>
                    </div>
                    <div className="main__cards">
                        <div className="card_admin">
                            <i className="fa fa-user fa-2x text-lightblue">
                            </i>
                            <div className="card_inner">
                                <p className="text-primary-p">Number of users</p>
                                <span
                                    className="font-bold text-title">{Useramount}</span> {/*buraya user sayısı konacak*/}
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
                                    <h1>Daily Revenue</h1>
                                    <p>Last 10 days</p>
                                </div>
                                <i className="fa fa-address-card"></i>
                            </div>
                            <LineChart1
                                revenue={dailyrevenue}/>
                        </div>
                        <div className="charts__right">
                            <div className="charts__right__title">
                                <div>
                                    <h1>Daily Profit</h1>
                                    <p>Last 10 days</p>
                                </div>
                                <i className="fa fa-address-card"></i>
                            </div>
                            <LineChart2
                                profit={dailyprofit}/>
                        </div>
                        <div className="charts__left">
                            <div className="charts__left__title">
                                <div>
                                    <h1>Distribution of Discounted Products</h1>
                                    <p>by categories</p>
                                </div>
                                <i className="fa fa-address-card"></i>
                            </div>
                            <BarChart
                            revenue={discount}
                        />
                        </div>
                        <div className="charts__right">
                            <div className="charts__right__title">
                                <div>
                                    <h1>Distribution of Revenue</h1>
                                    <p>by categories</p>
                                </div>
                                <i className="fa fa-address-card"></i>
                            </div>
                            <PieChart
                            revenue={revenuebycategory}
                        />
                        </div>
                    </div>
                </div>
            </main>
        );

}
export default Dashboard_sales;