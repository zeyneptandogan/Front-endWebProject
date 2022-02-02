
import React, { Component } from 'react';
import { Form,  FormGroup, FormFeedback} from 'reactstrap';
import isEmail from 'validator/lib/isEmail';

import {Link} from "react-router-dom";
import "./oldApp_login_signup.css";
import Axios from "axios";


class Forget extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }
    getInitialState = () => ({
        data_forgot: {
            email: '',
            name: '',
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
        if (data_forgot.name === '') errors.name = 'Name must be valid.';

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
            //console.log("helo2")
            Axios.post("http://localhost:8080/forgotPassword",{
                email: data_forgot.email,
                name: data_forgot.name,
            })
                .then(res=>{
                    console.log(res);

                })
                .catch((error) => {
                    console.log(error);
                })
            this.props.history.push("/")
        } else {
            this.setState({ errors });
        }
    }

    render() {
        const { data_forgot, errors } = this.state;
        return(
            <div className="page-one-bg">
                <div className="inner">

                    <div className="loginForm">
                        <Link to="/">
                            <img src="/images/bookstore.PNG" className="center"/>
                        </Link>
                        <h1>Forgot Password</h1>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <label className="label2">
                                    <span>Name</span>
                                    <div className="inputField">
                                        <input  className='input2' id="name" value={data_forgot.name} name="name" invalid={errors.name ? true : false} onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.name}</FormFeedback>
                                </label>
                            </FormGroup>

                            <FormGroup>
                                <label className="label2">
                                    <span>Email Address</span>
                                    <div className="inputField">
                                        <input className='input2' id="email" value={data_forgot.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                                    </div>
                                    <FormFeedback className="invalid">{errors.email}</FormFeedback>
                                </label>
                            </FormGroup>



                            <div className="action-btn" >
                                <button  className='submit_button_new' type='submit'>Submit</button>
                            </div>
                        </Form>

                    </div>
                    <div className="photo">
                        <img src="/images/undraw_book_reading_kx9s.svg" alt = "asja"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forget;

