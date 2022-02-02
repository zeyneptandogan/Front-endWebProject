import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import PaymentIcon from "@material-ui/icons/Payment";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";
import './Footer.css';
import {Link} from "react-router-dom";

class Footer extends React.Component {
        render() {
            return ( <>
                <div className="deal">
                    <div className="icons-container">

                        <div className="icons">

                            <LocalShippingIcon className="svg__icons"/>

                            <h3>Fast Delivery</h3>
                            <p>Your product will arrive within two days at the latest.</p>
                        </div>


                        <div className="icons">
                            <AccessAlarmIcon className="svg__icons"/>
                            <h3>24 x 7 Support</h3>
                            <p>You can directly reach us anytime you have a problem.</p>
                        </div>

                        <div className="icons">
                            <PaymentIcon className="svg__icons"/>
                            <h3>Secure Shopping</h3>
                            <p>All transactions are encrypted to secure every transaction.</p>
                        </div>

                        <div className="icons__last">
                            <PhoneAndroidIcon className="svg__icons"/>
                            <h3>Mobile App</h3>
                            <p>You can easily do all transactions from our mobile application.</p>
                        </div>

                    </div>
                </div>

            <section className="footer">

                <div className="box-container">

                    <div className="box">
                        <h2>Links</h2>
                        <ul>

                                <Link to="/category/0" key={"0"}
                                >Novel</Link>

                                <Link to="/category/1" key={"1"}
                                >Poetry</Link>

                                <Link to="/category/2" key={"2"}
                                >Story</Link>


                                <Link to="/category/3" key={"3"}
                                >Biography</Link>


                                <Link to="/category/4" key={"4"}
                                >Cookbooks</Link>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>Contact Us</h3>
                        <p>
                            <HomeIcon className="svg__icons__footer"/>
                            Sabanci University
                            Istanbul/Turkey
                        </p>
                        <p>
                            <PhoneIcon className="svg__icons__footer"/>
                            +90 216 483 95 32
                        </p>
                        <p>
                            <MailIcon className="svg__icons__footer"/>
                            bookstoresabanci@gmail.com
                        </p>
                    </div>

                </div>

                <h1 className="credit"> created by <span>CS308 group 21</span> | all rights reserved </h1>

            </section>
                </>
            );
        }

} export default Footer;