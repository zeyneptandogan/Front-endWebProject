import React, {useEffect, useState} from "react";
import "./CheckoutPage.css";
import PaymentIcon from "@material-ui/icons/Payment";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Footer from "../Header-Footer/Footer";
import Header from "../Header-Footer/Header";
import Axios from "axios";
import SavedCards from "./SavedCards";
import Items_element from "./Items";
import { Form } from 'reactstrap';
import UserStore from "../Login-SignUp/UserStore";


import {useHistory, useParams} from "react-router-dom";
import {SetBasket} from "../Login-SignUp/SetBasket";
import ConfirmTransaction from "./ConfirmTransaction";


function CheckoutPage(){

    const id = useParams();
    //console.log(id.addressId);

    let history = useHistory();

    const value=UserStore.cartTotal;

    const [finished, setFinished] = useState(0)
    const [confirmTransaction, setConfirmTransaction] = useState({ isOpen: false, title: '', subTitle: '' })

    const emptyBasket = () => {
        fetch("http://localhost:8080/cart/buy?userId=" + parseFloat(UserStore.userId) + "&addressId=" + id.addressId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then((result) => {
            //console.log(result,"buradayım2");
            if(result.ok){
                SetBasket(UserStore.userId);
            } else {
                if(result.status === 400){
                    alert("Error Wrong operation");
                } else {
                    alert("Error Something went wrong!");
                }
            }
        })
    }


    const url="http://localhost:8080/creditCard/add";

    const [Saved_Cards,setSavedCards] = useState([]);


    const [data_ch,setData_ch]=useState({
        card_holder:"",
        date:"",
        card_number:"",
        cvc:"",
        type: "",

    })



    useEffect(()=>{
        getSavedCardsfromAPI();
    },[]);




    const getSavedCardsfromAPI = async () => {
        return (Axios.post("http://localhost:8080/creditCard/getByEmail",{
            email: UserStore.email,
        })
            .then(res=>{
                //console.log(res)
                if (res.status===200) {
                    setSavedCards(res.data);
                }
                else {
                    if (res.status === 400) {
                        alert("Wrong email!");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            }))
    };



    function submit_ch(e){
        e.preventDefault();
        if(finished === 0) {
            Axios.post(url, {
                email: UserStore.email,
                full_name: data_ch.card_holder,
                end_date: data_ch.date,
                creditcard_number: data_ch.card_number,
                cvv: data_ch.cvc,
                type: data_ch.type,
            })
                .then(res => {
                    //console.log(res.data);
                    //setButtonPopup(true);
                    //console.log(buttonPopup);
                    //alert("Transaction Successful!")
                    setConfirmTransaction({
                        isOpen: true,
                        title: 'Transaction Successful!',
                        subTitle: "Continue Shopping",
                        onConfirm: () => {emptyBasket();
                            history.push("/");}
                    })



                }).catch((error) => {
                console.log(error);
                alert("this credit card already exists!")
            })

        }
        else{
            //alert("Transaction Successful!")
            //emptyBasket();
            //history.push("/");
            setConfirmTransaction({
                isOpen: true,
                title: 'Transaction Successful!',
                subTitle: "Continue Shopping",
                onConfirm: () => {emptyBasket();
                    history.push("/");}
            })
        }

    }
    function handle(e){
        const newdata_ch={...data_ch}
        newdata_ch[e.target.id]=e.target.value
        setData_ch(newdata_ch)
        //console.log(newdata_ch)
    }

    function handle2(val, creditcards){
        data_ch.card_holder = creditcards.full_name;
        data_ch.date = creditcards.end_date;
        data_ch.card_number = creditcards.creditcard_number;
        data_ch.cvc = creditcards.cvv;
        data_ch.type = creditcards.type;
        setFinished(1);
        //console.log(data_ch)
    }

    return(
        <>
            <Header/>
            <main className="page payment-page">
                <section className="payment-form dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2>Payment</h2>
                        </div>
                        <Form onSubmit={(e)=>submit_ch(e)}>
                            <div className="products">
                                <h3 className="title">Checkout</h3>
                                {UserStore.cartList.map((item) =>
                                    <Items_element
                                        item={item}
                                    />
                                )}
                                {/*<div className="item">
                                    <div className="price">$200</div>
                                    <p className="item-name">Product 1</p>
                                    <p className="item-description">Lorem ipsum dolor sit amet</p>
                                </div>
                                <div className="item">
                                    <div className="price">$120</div>
                                    <p className="item-name">Product 2</p>
                                    <p className="item-description">Lorem ipsum dolor sit amet</p>
                                </div> //AŞAĞISI DEĞİŞECEK*/}
                                <div className="total">Total<div className="price">${value}</div></div>
                            </div>
                            <div className="products">
                            <h3 className="title">Saved Cards:</h3>
                                <div className="row">

                                    {Saved_Cards.length !== 0 ? Saved_Cards.map((creditcards) =>
                                        <SavedCards
                                            onClick={(val)=>handle2(val, creditcards)}
                                            creditcards={creditcards}
                                        />
                                    ) : <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No saved cards found!</h3>}
                                    {/*<div className="credit-card visa selectable">
                                        <div className="credit-card-last4">
                                            4245
                                        </div>
                                        <div className="credit-card-expiry">
                                            03/21
                                        </div>
                                    </div>
                                    <div className="credit-card visa selectable">
                                        <div className="credit-card-last4">
                                            3535
                                        </div>
                                        <div className="credit-card-expiry">
                                            07/22
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className="card-details">
                                <h3 className="title">Credit Card Details</h3>
                                <div className="col">
                                    <div className="form-group col-sm-7">
                                        <p>Name-Surname</p>
                                        <input onChange={(e)=>handle(e)} id="card_holder" type="text" className="form-control"
                                               placeholder="Card Owner" aria-label="Card Holder"
                                               aria-describedby="basic-addon1" required={true} value={data_ch.card_holder}/>
                                    </div>
                                    <div className="form-group col-sm-7">
                                        <p>Expiration Date</p>

                                        <div className="input-group expiration-date">

                                            <div className="col-sm-12"><input onChange={(e)=>handle(e)} id="date" type="text" className="form-control" placeholder="MM/YY" aria-label="MM"
                                                                              aria-describedby="basic-addon1" required={true} value={data_ch.date}/></div>

                                        </div>
                                    </div>
                                    <div className="form-group col-sm-8">
                                        <p>Card Number</p>
                                        <input onChange={(e)=>handle(e)} id="card_number" type="text" className="form-control"
                                               placeholder="Card Number" aria-label="Card Holder"
                                               aria-describedby="basic-addon1" required={true} value={data_ch.card_number} minLength="16" maxLength="16"/>
                                    </div>
                                    <div className="form-group col-sm-8">
                                        <p>Card Type</p>
                                        <input onChange={(e)=>handle(e)} id="type" type="text" className="form-control"
                                               placeholder="Master Card, Visa etc." aria-label="Card Holder"
                                               aria-describedby="basic-addon1" required={true} value={data_ch.type}/>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <p>CVV</p>
                                        <input onChange={(e)=>handle(e)} id="cvc" type="text" className="form-control" placeholder="CVV"
                                               aria-label="Card Holder" aria-describedby="basic-addon1" required={true} minLength="3" maxLength="3" value={data_ch.cvc}/>
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn4 primary">Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </Form>

                    </div>
                </section>
            </main>
            <ConfirmTransaction
                confirmTransaction={confirmTransaction}
                setConfirmTransaction={setConfirmTransaction}
            />

            <Footer/>
        </>
    );
}
export default CheckoutPage;