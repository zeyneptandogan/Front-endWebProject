import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../Components_foradmin/useForm';
import Axios from "axios";
import UserStore from "../../../Login-SignUp/UserStore";

const initialFValues = {
    postcode: '',
    country: '',
    city: '',
    full_address: '',
    type: '',
}

export default function EditProduct(props) {


    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify,recordForEdit,setRecordForEdit,isEdit,setisEdit} = props;

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

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);


    const handleClose = () => {
        setRecordForEdit(null);
        resetForm();
        setOpenPopup(false);
    }



    console.log(recordForEdit);
    console.log(values);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Helooo")
        if (validate()){

            console.log("helo2")
            Axios.post("http://localhost:8080/address/update" ,{
                id: parseInt(recordForEdit.id),
                email: recordForEdit.email ,
                city: values.city ,
                country: values.country ,
                full_address: values.full_address ,
                postcode: values.postcode ,
                type:  values.type}
            )
                .then(res=>{
                    console.log(res.data);
                    setRecordForEdit(null);
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
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
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


                </Grid>
                <Grid item xs={6}>
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
                            text="Close"
                            color="default"
                            onClick={handleClose} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}