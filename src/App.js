
import React from 'react';

import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login-SignUp/login";
import Register from "./Login-SignUp/signup";
import Home from "./Home/Home";
import DetailPage from "./DetailPage/DetailPage";
import Header from "./Header-Footer/Header";
import Footer from "./Header-Footer/Footer";
import history from "./history";
import LandingPage from "./Category/CategoryPage";
import Checkout from "./Cart/Cart";
import Search from "./Home/SearchRes";
import AddressPage from "./Payment/AddressPage";
import CheckoutPage from "./Payment/CheckoutPage";
import ScrollToTop from "./ScrollToTop";
import ProductManager from "./Admin/ProductManager/ProductManager";
import Allproducts from "./Admin/ProductManager/Allproducts";
import CommentPage from "./Admin/ProductManager/CommentPage";
import SalesManager from "./Admin/SalesManager/SalesManager";
import Invoices from "./Admin/ProductManager/Invoices";
import Allrefunds from "./Admin/SalesManager/Allrefunds";
import Analytics from "./Admin/SalesManager/Analytics";
import Invoices_sales from "./Admin/SalesManager/Invoices_sales";
import Productedit from "./Admin/SalesManager/Productedit";
import Profile from "./Profile/Profile";
import Allorders from "./Profile/Allorders";
import Allcomments from "./Profile/Allcomments"
import AllAddress from "./Profile/AllAddress";
import AllCreditCard from "./Profile/AllCreditCard";
import Forget from "./Login-SignUp/forgotPass";
import ForgotPassword from "./Login-SignUp/ForgotPassword";

function App(){
    return(
        <Router history={history}>
            <ScrollToTop>
            <div className="app">
                <Switch>
                    <Route path="/category/:key">
                        <Header/>
                        <LandingPage/>
                        <Footer/>
                    </Route>

                    <Route path="/cart">
                        <Header/>
                        <Checkout/>
                        <Footer/>
                    </Route>

                    <Route path="/search/:input">
                        <Search/>
                    </Route>

                    <Route path="/product_detail/:product_id">
                        <DetailPage/>
                    </Route>

                    <Route path="/c/:addressId" component={CheckoutPage}/>

                    <Route path="/a" component={AddressPage}/>

                    <Route path="/login" component={Login}/>

                    <Route path="/signup" component={Register}/>

                    <Route path="/p" component={ProductManager} />
                    <Route path="/s" component={SalesManager} />
                    <Route path="/pr" component={Profile} />

                    <Route path="/productmanager/allproducts" component={Allproducts} />
                    <Route path="/productmanager/invoices" component={Invoices} />
                    <Route path="/productmanager/:comment" component={CommentPage} />

                    <Route path="/salesmanager/refund" component={Allrefunds} />
                    <Route path="/salesmanager/analytics" component={Analytics} />
                    <Route path="/salesmanager/invoices" component={Invoices_sales} />
                    <Route path="/salesmanager/product" component={Productedit} />

                    <Route path="/profile/history" component={Allorders} />
                    <Route path="/profile/comments" component={Allcomments} />
                    <Route path="/profile/addr" component={AllAddress} />
                    <Route path="/profile/credi" component={AllCreditCard} />

                    <Route path="/forget" component={Forget} />
                    <Route path="/forgotPassword" component={ForgotPassword} />

                    <Route  path="/" component={Home}/>




                </Switch>
            </div>
            </ScrollToTop>
        </Router>
    )
}

export default  App;
