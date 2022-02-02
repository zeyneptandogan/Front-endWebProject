import React, {useEffect, useState} from "react";

import "./Dashboard_profile.css";
import { Grid } from '@material-ui/core';
import Controls from "../../controls/Controls";
import {Form, useForm} from "../../Components_foradmin/useForm";
import UserStore from "../../Login-SignUp/UserStore";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {ArrowForwardOutlined} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import Axios from "axios";

const initialFValues = {
    name: '',
    email: '',
    mobile: '',

}

const initialFValues2 = {

    password2: '',
    password2_again: '',
    password3: '',
}
function Dashboard_profile(){
    const history = useHistory();

    const [Userinfo,setUserinfo] = useState([]);
    //const[Productamount,setProductamount]=useState([]);
    //const[Companyamount,setCompanyamount]=useState([]);
    //const[Commentamount,setCommentamount]=useState([]);
    //const [revenuebycategory,setrevenuebycategory] = useState([]);   //
    //const [dailyrevenue,setdailyrevenue] = useState([]);
    //const [dailyprofit,setdailyprofit] = useState([]);
    //const [order,setOrder] = useState([]);

    useEffect(()=>{
        getUserInfo();
    }, [])

    const getUserInfo = () =>{
        fetch('http://localhost:8080/user/getByID?id=' + UserStore.userId,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("user: ", json);
                setUserinfo(json);
            }).catch((error) => {
            console.error(error);
        });
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name.length > 0  ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 0 ? "" : "This field is required."


        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const validate2 = (fieldValues2 = values2) => {
        let temp2 = { ...errors2 }

        if ('password2' in fieldValues2)
            temp2.password2 = fieldValues2.password2.length > 0 ? "" : "This field is required."
        if ('password3' in fieldValues2)
            temp2.password3 = fieldValues2.password3.length > 0 ? "" : "This field is required."



        setErrors2({
            ...temp2
        })

        if (fieldValues2 === values2)
            return Object.values(temp2).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const {
        values2,
        setValues2,
        errors2,
        setErrors2,
        handleInputChange2,
        resetForm2
    } = useForm(initialFValues2, true, validate2);


    const handleSubmit = e => {
        console.log("Helooo")
        e.preventDefault()
        if (validate()){
            Axios.post(
                "http://localhost:8080/user/update" ,{
                    id: UserStore.userId,
                    email: UserStore.email,
                    mobile: values.mobile,
                    name: values.name,
                }
            )
                .then(res=>{
                    console.log(res.data);
                    fetch('http://localhost:8080/user/getByID?id=' + UserStore.userId,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                            Accept: 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("user: ", json);
                            setUserinfo(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }

    const handleSubmit2 = e => {
        e.preventDefault()
        console.log("BURDAYIM")

        let temp3 = {...errors2}
        temp3.password2 = values2.password2.length > 0 ? "" : "This field is required."
        temp3.password3 = values2.password3.length > 0 ? "" : "This field is required."
        temp3.password2_again = values2.password2 === values2.password2_again ? "" : "Password should match"
        setErrors2({
            ...temp3
        })

        if (Object.values(temp3).every(x => x === "") ) {

            Axios.post(
                "http://localhost:8080/user/changePassword" ,{
                    email: UserStore.email,
                    currentPassword: values2.password3,
                    newPassword: values2.password2,
                }
            )
                .then(res=>{
                    console.log(res.data);
                    fetch('http://localhost:8080/user/getByID?id=' + UserStore.userId,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                            Accept: 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("user: ", json);
                            setUserinfo(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Old password is wrong!")
                })
            resetForm2();
        }

    }

    function handleClick2(){
        if(UserStore.email === "product_manager@bookstore.com"){
            history.push("/p");
        }
        else if(UserStore.email === "sales_manager@bookstore.com"){
            history.push("/s");
        }
    }

    useEffect(() => {
        if (Userinfo.length !== 0)
            setValues({
                ...Userinfo
            })
    }, [Userinfo])

    return(
        <>
            <div className="main2">
            <div className="main__container2">
                {UserStore.email !== "product_manager@bookstore.com" && UserStore.email !== "sales_manager@bookstore.com" ?
                    <div className="main_cards_inputs">
                    <div className="charts__left2">
                        <div className="charts_right_title">
                            <div>
                                <h1>Account Information</h1>

                            </div>
                            <i className="fa fa-address-card"></i>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Controls.Input
                                        name="name"
                                        label="Full Name"
                                        value={ values.name }
                                        onChange={handleInputChange}
                                        error={errors.name}

                                    />
                                    <Controls.Input
                                        label="Email"
                                        name="email"
                                        value={UserStore.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                    />
                                    <Controls.Input
                                        label="Mobile"
                                        name="mobile"
                                        value={ values.mobile }
                                        onChange={handleInputChange}
                                        error={errors.mobile}
                                    />
                                    <Controls.Button
                                        text="Update"
                                        variant="outlined"
                                        startIcon={<EditOutlinedIcon/>}
                                        type='submit'
                                        //className={classes.newButton}
                                        //onClick={()=>}
                                    />

                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                    <div className="charts__right2">
                        <div className="charts_right_title">
                            <div>
                                <h1>Change Your Password</h1>

                            </div>
                            <i className="fa fa-address-card"></i>
                        </div>
                        <Form onSubmit={handleSubmit2}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Controls.Input
                                        label="Old Password"
                                        name="password3"
                                        type="password"
                                        value={values2.password3}
                                        onChange={handleInputChange2}
                                        error={errors2.password3}

                                    />
                                    <Controls.Input
                                        label="New Password"
                                        name="password2"
                                        type="password"
                                        value={values2.password2}
                                        onChange={handleInputChange2}
                                        error={errors2.password2}

                                    />
                                    <Controls.Input
                                        label="New Password Again"
                                        name="password2_again"
                                        type="password"
                                        value={values2.password2_again}
                                        onChange={handleInputChange2}
                                        error={errors2.password2_again}
                                    />
                                    <Controls.Button
                                        text="Change"
                                        variant="outlined"
                                        startIcon={<EditOutlinedIcon/>}
                                        type='submit'
                                        //className={classes.newButton}
                                        //onClick={()=>}
                                    />

                                </Grid>
                            </Grid>
                        </Form>
                    </div>
                </div> :
                    <div className="main_cards_inputs">

                        <div className="charts__right2">
                            <div className="charts_right_title">
                                <div>
                                    <h1>Go to admin dashboard</h1>

                                </div>
                                <i className="fa fa-address-card"></i>
                            </div>

                                <Grid container>
                                    <Grid item xs={12}>

                                        <Controls.Button
                                            text="GO"
                                            variant="outlined"
                                            startIcon={<ArrowForwardOutlined/>}
                                            //className={classes.newButton}
                                            onClick={()=>handleClick2()}
                                        />

                                    </Grid>
                                </Grid>

                        </div>
                    </div>}

            </div>
            </div>
        </>

    );
}
export default Dashboard_profile;