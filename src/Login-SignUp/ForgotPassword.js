import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback } from 'reactstrap';
import isEmail from 'validator/lib/isEmail';

import {Link} from "react-router-dom";
import "./oldApp_login_signup.css";
import Axios from "axios";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }
    getInitialState = () => ({
        data_forgot: {
            email: '',
            newpassword: '',
            secondnewpass:'',
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data_forgot: {
                ...this.state.data_forgot,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data_forgot } = this.state;
        let errors = {};
        if (!isEmail(data_forgot.email)) errors.email = 'Email must be valid.';
        if (data_forgot.email === '') errors.email = 'Email can not be blank.';
        if (data_forgot.newpassword === '') errors.newpassword = 'Password must be valid.';
        if (data_forgot.secondnewpass !== data_forgot.newpassword) errors.secondnewpass = 'Passwords must match.';
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data_forgot } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            //console.log(data_forgot);
            //Call an api here
            //Resetting the form
            const url="http://localhost:8080/changePassword";  //mail yollanarak yeni password ü kaydeden api  DEĞİŞECEK!!
            Axios.post(url,{
                email: data_forgot.email,
                newPassword: data_forgot.newpassword,
            })
                .then(res=>{
                    //console.log(res)
                    if (res.status===200) {
                        this.props.history.push("/login");
                    }
                }).catch((error) => {
                console.log(error);
                alert(error);
            })

        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { data_forgot, errors } = this.state;
        return(
            <div className="page-one-bg">
                <div className="inner">
                    <div className="photo">
                        <img src="/images/undraw_Reading_book_re_kqpk.svg" alt = "asja"/>
                    </div>
                    <div className="loginForm">
                        <Link to="/">
                            <img src="/images/bookstore.PNG" className="center"/>
                        </Link>
                        <h1>Forgot Password</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label className="label2">
                                    <span>Email Address</span>
                                    <div className="inputField">
                                        <input className='input2' id="email" value={data_forgot.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.email}</FormFeedback>
                                </label>
                            </FormGroup>

                            <FormGroup>
                                <label className="label2">
                                    <span>New Password</span>
                                    <div className="inputField">
                                        <input  className='input2' id="newpassword" value={data_forgot.newpassword} type="password" name="newpassword" invalid={errors.newpassword ? true : false} onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.newpassword}</FormFeedback>
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <label className="label2">
                                    <span>Confirm New Password</span>
                                    <div className="inputField">
                                        <input  className='input2' id="secondnewpass" value={data_forgot.secondnewpass} type="password" name="secondnewpass" invalid={errors.secondnewpass ? true : false} onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.secondnewpass}</FormFeedback>
                                </label>
                            </FormGroup>

                            <div className="action-btn" >
                                <button  className='submit_button_new' type='submit'>Submit</button>
                            </div>
                        </Form>

                    </div>

                </div>
            </div>
        );
    }
}

export default ForgotPassword;

//eklenmesi gereken css
/*
.submit_button_new{
    width:50%;
    padding: 10px 30px;
    cursor:pointer;
    display: block;
    margin: auto;
    background:linear-gradient(45deg, rgba(222,197,5,1) 24%, rgba(255,107,0,1) 100%);
    border:0;
    outline:none;
    border-radius: 30px;
}

* */