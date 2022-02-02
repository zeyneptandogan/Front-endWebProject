import React, { Component } from 'react';
import { Form, FormGroup, FormFeedback } from 'reactstrap';
import isEmail from 'validator/lib/isEmail';

import SubmitButton2 from "./SubmitButton2";

import "./oldApp_login_signup.css";
import Axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }
    getInitialState = () => ({
        data: {
            name: '',
            email: '',
            phonenumber:'',
            password: '',
            confirmPassword: ''
        },
        errors: {}
    });
    handleClick = e => {
        this.props.history.push("/login");
    };
    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.name === '') errors.name = 'Name-surname can not be blank.';
        if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.phonenumber === '') errors.phonenumber = 'Phone number can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';
        if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            //console.log(data);
            //Call an api here
            //Resetting the form
            const url="http://localhost:8080/register/addUser";
            Axios.post(url,{
                mobile: data.phonenumber,
                email: data.email,
                password: data.password,
                name: data.name,
            })
                .then(res=>{this.props.history.push("/login")})
                .catch(error => {
                    return error;
                });

            //this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div className="page-one-bg">
                <div className="inner">

                    <div className="loginForm">
                        <h1> Sign Up </h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label className="label2">
                                    <span>Name Surname</span>
                                    <div className="inputField">
                                        <input className='input2' id="name" value={data.name} invalid={errors.name ? true : false} name="name" onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.name}</FormFeedback>
                                </label>
                            </FormGroup>

                            <FormGroup>
                                <label className="label2">
                                    <span>Email Address</span>
                                    <div className="inputField">
                                        <input className='input2' id="email" value={data.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.email}</FormFeedback>
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <label className="label2">
                                    <span>Phone Number</span>
                                    <div className="inputField">
                                        <input className='input2' id="phonenumber" value={data.phonenumber} invalid={errors.phonenumber ? true : false} name="phonenumber" onChange={this.handleChange}  />
                                    </div>
                                    <FormFeedback className="invalid">{errors.phonenumber}</FormFeedback>
                                </label>
                            </FormGroup>
                            <FormGroup>
                                <label className="label2">
                                    <span>Password</span>
                                    <div className="inputField">
                                        <input  className='input2' id="password" value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.password}</FormFeedback>
                                </label>
                            </FormGroup>

                            <FormGroup>
                                <label className="label2">
                                    <span>Password-Again</span>
                                    <div className="inputField">
                                        <input className="input2" id="confirmPassword" value={data.confirmPassword} type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.confirmPassword}</FormFeedback>
                                </label>
                            </FormGroup>
                            <div className="action-btn" >
                                <button  className='btn2 primary' type='submit'>Create Account</button>
                                <SubmitButton2

                                    text='Already a user? Sign In'
                                    disabled={this.state.buttonDisabled}
                                    type="link"
                                    onClick={this.handleClick}
                                />
                            </div>
                        </Form>
                    </div>
                    <div className="photo">
                        <img src="/images/undraw_Bibliophile_hwqc.svg" alt = "asja"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;