import React, {  useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../../Components_foradmin/useForm';
import Axios from "axios";
import UserStore from "../../../Login-SignUp/UserStore";

const initialFValues = {
    productId: '',
    comment: '',
    fullname: '',
    status:'',
}

export default function EditProduct(props) {


    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify,recordForEdit,setRecordForEdit,isEdit,setisEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullname' in fieldValues)
            temp.fullname = fieldValues.fullname.length > 0 ? "" : "This field is required."
        if ('comment' in fieldValues)
            temp.comment = fieldValues.comment.length > 0 ? "" : "This field is required."

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
            Axios.put("http://localhost:8080/comments/changeComment" , {  //HATA VERİYO BUNA Bİ BAK
                id:  parseInt(recordForEdit.id) ,
                productId: parseInt(recordForEdit.productId),
                comment: values.comment,
                fullname: values.fullname,
                status: recordForEdit.status,
                userId: parseInt(recordForEdit.userId)}
            )
                .then(res=>{
                    console.log(res);
                    setRecordForEdit(null);
                    fetch('http://localhost:8080/comments/getCommentsOfUser?userId=' + parseFloat(UserStore.userId),{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of products: ", json);
                            setRecords(json);
                        }).catch((error) => {
                        console.error(error);
                    });
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
                        name="productId"
                        label="Product Name"
                        value={values.productId}
                        onChange={handleInputChange}
                        error={errors.productId}
                        disabled
                    />   {/*READ ONLY*/}
                    <Controls.Input
                        label="Status"
                        name="status"
                        value={values.status}
                        onChange={handleInputChange}
                        error={errors.status}
                        disabled/>


                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Comment"
                        name="comment"
                        value={values.comment}
                        onChange={handleInputChange}
                        error={errors.comment}
                    />
                    <Controls.Input
                        label="Full Name"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleInputChange}
                        error={errors.fullname}
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