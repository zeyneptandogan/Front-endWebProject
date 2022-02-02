import React from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../Components_foradmin/useForm';
import Axios from 'axios';
import UserStore from "../../../Login-SignUp/UserStore";


const initialFValues = {
    postcode: '',
    country: '',
    city: '',
    full_address: '',
    type: '',
}

export default function Addproduct2(props) {
    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify} = props;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('postcode' in fieldValues)
            temp.postcode = fieldValues.postcode ? "" : "This field is required."
        if ('country' in fieldValues)
            temp.country = fieldValues.country ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('full_address' in fieldValues)
            temp.full_address = fieldValues.full_address ? "" : "This field is required."
        if ('type' in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required."


        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }



    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);



    const handleClose = () => {

        resetForm();
        setOpenPopup(false);
    }




        const handleSubmit = e => {
            e.preventDefault()
            if (validate()){

                Axios.post("http://localhost:8080/address/add",{   //url degisecek
                    email: UserStore.email,
                    postcode: values.postcode,
                    country: values.country,
                    city: values.city,
                    full_address: values.full_address,
                    type: values.type
                })
                    .then(res=>{
                        console.log(res.data);
                        Axios.post("http://localhost:8080/address/getByEmail",{
                            email: UserStore.email,
                        })
                            .then(res=>{
                                console.log(res)
                                if (res.status===200) {
                                    setRecords(res.data);
                                }
                                else {
                                    if (res.status === 400) {
                                        alert("Wrong email!");
                                    }
                                    else {
                                        alert("Something went wrong!");
                                    }
                                }

                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                resetForm();
                setOpenPopup(false);
                setNotify({
                    isOpen:true,
                    message:'Submitted Successfully',
                    type:'success',
                })

            }
        }


        return (

            <Form id="add" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <Controls.Input
                            name="country"
                            label="Country"
                            value={values.country}
                            onChange={handleInputChange}
                            error={errors.country}
                        />
                        <Controls.Input
                            label="City"
                            name="city"
                            value={values.city}
                            onChange={handleInputChange}
                            error={errors.city}
                        />
                        <Controls.Input
                            label="Full Address"
                            name="full_address"
                            value={values.full_address}
                            onChange={handleInputChange}
                            error={errors.full_address}
                        />
                        <Controls.Input
                            label="Postcode"
                            name="postcode"
                            value={values.postcode}
                            onChange={handleInputChange}
                            error={errors.postcode}
                        />
                        <Controls.Input
                            label="Type"
                            name="type"
                            value={values.type}
                            onChange={handleInputChange}
                            error={errors.type}
                        />




                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm} />
                            <Controls.Button
                                text="Close"
                                color="secondary"
                                onClick={handleClose} />
                        </div>
                    </Grid>
                </Grid>
            </Form>
        )





}