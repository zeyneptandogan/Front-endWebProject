import React from 'react';
import Inputfield from "./inputfield";
import SubmitButton from "./SubmitButton";
import UserStore from "./UserStore";
import SubmitButton2 from "./SubmitButton2";
import history from "../history";
import {Link} from "react-router-dom";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            email:'',
            password: '',
            buttonDisabled: false,
            confirmPassword:''
        }
    }
    setInputValue(property,val){
        val=val.trim();
        this.setState({
            [property]:val
        })
    }

    resetForm(){
        this.setState({
            username: '',
            email:'',
            password:'',
            buttonDisabled: false,
            confirmPassword:''
        })
    }

    async doSignUp(){
        if(!this.state.username){
            alert("Username cannot be empty.");
        }
        else if(!this.state.email){
            alert("Email cannot be empty.");
        }
        else if(!this.state.password){
            alert("Password cannot be empty.");
        }
        else if(!this.state.confirmPassword){
            alert("Please enter the same password again.");
        }
        else if(this.state.password!==this.state.confirmPassword){
            alert("Passwords do not match.");
        }


        const settings2 = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email':this.state.email,'password':this.state.password, 'name':this.state.username})
        };

        try {
            const fetchResponse2 = await fetch(`http://localhost:8080/register/addUser`, settings2);
            console.log(fetchResponse2);
            //const data = await fetchResponse.json();

            if (fetchResponse2.ok) {
                UserStore.isLoggedIn=true;
                UserStore.email=this.state.email;
                history.replace("/");
            }

            else {
                if (fetchResponse2.status === 400) {
                    this.resetForm();
                    alert("Wrong e-mail or password!");
                }
                else {
                    alert("Something went wrong!");
                }
            }

        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async goLogin(){
        history.push("/login");
    }

    render(){

        return (
            <div className="page-one-bg">
            <div className="inner">

                <div className="loginForm">
                    <Link to="/">
                        <img src="/images/bookstore.PNG" className="center"/>
                    </Link>
                    <h1> Sign Up </h1>
                    <form>
                        <label className="label2">
                            <span>Name Surname</span>

                            <Inputfield
                                type='name'

                                value={this.state.username ? this.state.username :''}
                                onChange={ (val)=>this.setInputValue('username',val)}
                            />
                        </label>
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
                        <label className="label2">
                            <span>Password-Again</span>

                            <Inputfield
                                type='password'
                                value={this.state.confirmPassword ? this.state.confirmPassword :''}
                                onChange={ (val)=>this.setInputValue('confirmPassword',val)}
                            />
                        </label>

                        <div className="action-btn" >
                            <SubmitButton

                                text='Create Account'
                                disabled={this.state.buttonDisabled}
                                onClick={()=>this.doSignUp()}
                            />


                            <SubmitButton2

                                text='Already a user? Sign In'
                                disabled={this.state.buttonDisabled}
                                onClick={()=>this.goLogin()}
                            />

                        </div>

                    </form>
                </div>
                <div className="photo">
                    <img src="/images/undraw_Bibliophile_hwqc.svg" alt = "asja"/>
                </div>
            </div>
            </div>
        );
    }
}

export default SignUpForm;