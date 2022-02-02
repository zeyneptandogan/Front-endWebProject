import React from 'react';
import Inputfield from "./inputfield";
import SubmitButton from "./SubmitButton";
import UserStore from "./UserStore";
import SubmitButton2 from "./SubmitButton2";
import "./oldApp_login_signup.css";
import history from "../history";
import {Link} from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);



        this.state={
            email:'',
            password: '',
            buttonDisabled: false
        }
        this.routeChange = this.routeChange.bind(this);

    }



    setInputValue(property,val){
        val=val.trim();
        this.setState({
            [property]:val
        })
    }
    resetForm(){
        this.setState({
            email:'',
            password:'',
            buttonDisabled: false
        })
    }
    routeChange() {
        let path = "/";
        this.props.history.push(path);
    }


    doLogin(){
        if(!this.state.email){
            alert("Email cannot be empty.");
        }
        else if(!this.state.password){
            alert("Password cannot be empty.");
        }


        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':this.state.email,'password':this.state.password})
        };

        try {
            const fetchResponse = fetch(`http://localhost:8080/login`, settings);
            console.log(fetchResponse);
            //const data = await fetchResponse.json();

            if (fetchResponse.ok) {
                UserStore.isLoggedIn=true;
                UserStore.email=this.state.email;

            }

            else {
                if (fetchResponse.status === 400) {

                    alert("Wrong e-mail or password!");
                }
                else {
                    this.resetForm();
                    alert("Something went wrong!");
                }
            }

        } catch (e) {
            console.log(e);
            return e;
        }
        if (UserStore.isLoggedIn === true){
            this.routeChange();
        }
    }

     goSignUp(){
         history.push("/signup");
    }

    render(){

        return (
            <div className="page-one-bg">
            <div className="inner">
                <div className="photo">
                    <img src="/images/undraw_book_lover_mkck.svg" alt = "fjldsfj"/>
                </div>
                <div className="loginForm">
                    <Link to="/">
                        <img src="/images/bookstore.PNG" className="center"/>
                    </Link>
                    <h1> Sign In </h1>
                    <form>
                        <label className="label2">
                            <span>Email Address</span>
                            <Inputfield
                                type='text'

                                value={this.state.email ? this.state.email :''}
                                onChange={ (val)=>this.setInputValue('email',val)}
                            />
                        </label>
                        <label className="label2">
                            <span>Password</span>
                            <Inputfield
                                type='password'

                                value={this.state.password ? this.state.password :''}
                                onChange={ (val)=>this.setInputValue('password',val)}
                            />
                        </label>
                        <div className="action-btn" >
                            <SubmitButton

                                text='Login'
                                disabled={this.state.buttonDisabled}
                                onClick={()=>this.doLogin()}
                                /**onClick={this.handleClick}**/

                            />


                            <SubmitButton2

                                text='Don&apos;t have an account? Sign Up'
                                disabled={this.state.buttonDisabled}
                                onClick={()=>this.goSignUp()}
                            />





                        </div>
                        <p className="forgot-pass">Forgot Password?</p>
                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default LoginForm;