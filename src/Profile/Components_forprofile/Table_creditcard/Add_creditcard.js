import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../Components_foradmin/useForm';
import Axios from 'axios';
import UserStore from "../../../Login-SignUp/UserStore";


const initialFValues = {
    full_name: '',
    end_date: '',
    creditcard_number: '',
    cvv: '',
    type: '',
}

export default function Addproduct2(props) {
    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify} = props;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('full_name' in fieldValues)
            temp.full_name = fieldValues.full_name ? "" : "This field is required."
        if ('end_date' in fieldValues)
            temp.end_date = fieldValues.end_date ? "" : "This field is required."
        if ('creditcard_number' in fieldValues)
            temp.creditcard_number = fieldValues.creditcard_number ? "" : "This field is required."
        if ('cvv' in fieldValues)
            temp.cvv = fieldValues.cvv ? "" : "This field is required."
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

            Axios.post("http://localhost:8080/creditCard/add",{   //url degisecek
                email: UserStore.email,
                full_name: values.full_name,
                end_date: values.end_date,
                creditcard_number: values.creditcard_number,
                cvv: values.cvv,
                type: values.type
            })
                .then(res=>{
                    console.log(res.data);
                    Axios.post("http://localhost:8080/creditCard/getByEmail",{
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
                        label="Card Holder Name"
                        name="full_name"
                        value={values.full_name}
                        onChange={handleInputChange}
                        error={errors.full_name}
                    />
                    <Controls.Input
                        label="Credit Card Number"
                        name="creditcard_number"
                        value={values.creditcard_number}
                        onChange={handleInputChange}
                        error={errors.creditcard_number}
                    />
                    <Controls.Input
                        label="CVV"
                        name="cvv"
                        value={values.cvv}
                        onChange={handleInputChange}
                        error={errors.cvv}
                    />
                    <Controls.Input
                        name="end_date"
                        label="End Date"
                        value={values.end_date}
                        onChange={handleInputChange}
                        error={errors.end_date}
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