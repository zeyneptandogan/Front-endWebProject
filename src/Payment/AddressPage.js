import React, {useEffect, useState} from "react";
import "./CheckoutPage.css"
import Footer from "../Header-Footer/Footer";
import Header from "../Header-Footer/Header";
import Axios from 'axios';
import SavedAddress from "./SavedAddress";
import UserStore from "../Login-SignUp/UserStore";
import { Form, FormGroup } from 'reactstrap';
import { useHistory } from "react-router-dom";
import {Radio} from "antd";



function AddressPage(){
    let history = useHistory();
    const [SavedAddresses,setSavedAddress] = useState([]);
    const [finished, setFinished] = useState(0)
    const [data,setData]=useState({
        email: UserStore.email, //bu değişecekkk
        postcode:"",
        country:"",
        city:"",
        full_address:"",
        type:""
    })



    //console.log(UserStore.email)

    useEffect(()=>{
        getSavedAddressesfromAPI();
    },[]);
    const getSavedAddressesfromAPI = async () => {
            //console.log(data.email)
        return (Axios.post("http://localhost:8080/address/getByEmail",{
            email: data.email,
        })
            .then(res=>{
                //console.log(res)
                if (res.status===200) {
                    setSavedAddress(res.data);
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

    let address = 0;

    function submit(e){
        e.preventDefault();
        if(finished === 0){
            Axios.post("http://localhost:8080/address/add",{
                email: data.email,
                postcode: data.postcode,
                country: data.country,
                city: data.city,
                full_address: data.full_address,
                type: data.type
            })
                .then(res=>{
                    //console.log(res.data);
                    address = res.data;
                    history.push("/c/"+address);
                })
                .catch((error) => {
                    console.log(error);
                    alert("this address already exists!")
                })
        }
        else{
            history.push("/c/"+finished);
        }
    }
    function handle(e){
        const newdata={...data}
        newdata[e.target.id]=e.target.value
        setData(newdata)
        //console.log(newdata)
    }
    function handle2(val, card){
        data.email = card.email;
        data.postcode = card.postcode;
        data.full_address = card.full_address;
        data.city = card.city;
        data.country = card.country;
        data.type = card.type;
        setFinished(card.id);
        //console.log(data)

    }

    return(
        <>
            <Header/>
            <main className="page payment-page">
                <section className="payment-form dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2>Shipping Address</h2>
                        </div>
                        <Form onSubmit={(e)=>submit(e)}>
                            <div className="products">
                                <h3 className="title">Saved Addresses:</h3>
                                <div className="row">
                                    {SavedAddresses.length !== 0 ? SavedAddresses.map((card) =>
                                        <SavedAddress
                                            onClick={(val)=>handle2(val, card)}
                                            card={card}
                                        />
                                    ) : <h3 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No saved addresses found!</h3>}

                                   </div>
                            </div>
                            <div className="card-details">
                                <h3 className="title">Address Details</h3>
                                <div className="col">
                                    <div className="form-group col-sm-7">
                                        <p>Email</p>
                                        <FormGroup>
                                            <input onChange={(e)=>handle(e)} id="email" type="text" className="form-control"
                                                   placeholder="Email" aria-label="Card Holder"
                                                   aria-describedby="basic-addon1" value={data.email} required={true}
                                            />
                                        </FormGroup>
                                    </div>

                                    <div className="form-group col-sm-8">
                                        <p>COUNTRY</p>
                                        <FormGroup>
                                            <input  onChange={(e)=>handle(e)} id="country" type="text" className="form-control"
                                                    placeholder="Country" aria-label="country"
                                                    aria-describedby="basic-addon1" value={data.country} required={true}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <p>CITY</p>
                                        <FormGroup>
                                            <input onChange={(e)=>handle(e)} id="city" type="text" className="form-control" placeholder="City"
                                                   aria-label="Card Holder" aria-describedby="basic-addon1" value={data.city} required={true}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <p>ADDRESS</p>
                                        <FormGroup>
                                            <input  onChange={(e)=>handle(e)} id="full_address" type="text" className="form-control" placeholder="Address"
                                                    aria-label="Card Holder" aria-describedby="basic-addon1" value={data.full_address} required={true}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group col-sm-7">
                                        <p>Post Code</p>

                                        <div className="input-group phone">
                                            <FormGroup>
                                                <div className="col-sm-12"><input onChange={(e)=>handle(e)} id="postcode" type="text" className="form-control" placeholder="Zip Code" aria-label="number"
                                                                                  aria-describedby="basic-addon1" value={data.postcode} required={true}
                                                /></div>
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                        <p>ADDRESS TYPE</p>
                                        <FormGroup>
                                            <input onChange={(e)=>handle(e)} id="type" type="text" className="form-control" placeholder="Address Type"
                                                   aria-label="Card Holder" aria-describedby="basic-addon1" value={data.type} required={true}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="row">
                                        <button type="submit" className="btn4 primary">Proceed to payment</button>
                                    </div>

                                </div>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>


            <Footer/>
        </>
    );
}
export default AddressPage;