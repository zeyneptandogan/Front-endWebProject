import React, {  useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../useForm';
import Axios from "axios";

const initialFValues = {
    productName: '',
    category: '',
    initialPrice: '',
    currentPrice:'',
    cost:'',
    imgUrl: '',
    genre: '',
    year: '',
    description: '',
    distributor: '',
    initialStock:'',
    currentStock:'',
    writer:'',
    discountRatio:'',
    discountEnd:'',
    discountStart:'',
}
export default function Editdiscount(props) {


    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify,recordForEdit,setRecordForEdit,isEdit,setisEdit} = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        /*if ('productName' in fieldValues)
            temp.productName = fieldValues.productName.length > 0  ? "" : "This field is required."
        if ('category' in fieldValues)
            temp.category = fieldValues.category.length > 0 ? "" : "This field is required."

        if ('imgUrl' in fieldValues)
            temp.imgUrl = fieldValues.imgUrl.length > 0 ? "" : "This field is required."

        if ('year' in fieldValues)
            temp.year = fieldValues.year.length > 0 ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description.length > 0 ? "" : "This field is required."
        if ('writer' in fieldValues)
            temp.writer = fieldValues.writer.length > 0 ? "" : "This field is required."
        if ('distributor' in fieldValues)
            temp.distributor = fieldValues.distributor.length > 0 ? "" : "This field is required."
        if ('currentStock' in fieldValues)
            temp.currentStock = fieldValues.currentStock.length > 0 ? "" : "This field is required."*/
        if ('discountRatio' in fieldValues)
            temp.discountRatio = fieldValues.discountRatio.toString().length > 0 ? "" : "This field is required."
        if ('discountEnd' in fieldValues)
            temp.discountEnd = fieldValues.discountEnd !== null ? "" : "This field is required."
        if ('discountStart' in fieldValues)
            temp.discountStart = fieldValues.discountStart !== null ? "" : "This field is required."

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

    const handleSubmit = e => {
        console.log("Helooo")
        e.preventDefault()
        if (validate()){

            console.log("helo2")
            Axios.put("http://localhost:8080/productManager/updateProduct",{   //product manager dakini kullanabiliriz dedik.
                productId: recordForEdit.productId,
                productName: recordForEdit.productName,
                category: recordForEdit.category,
                initialPrice: recordForEdit.initialPrice,
                currentPrice: recordForEdit.currentPrice,
                cost: recordForEdit.cost,
                imgUrl: recordForEdit.imgUrl,
                genre: recordForEdit.genre,
                year: recordForEdit.year,
                description: recordForEdit.description,
                distributor: recordForEdit.distributor,
                initialStock: recordForEdit.initialStock,
                currentStock:recordForEdit.currentStock,
                writer:recordForEdit.writer,
                discountRatio:values.discountRatio,
                discountStart:values.discountStart,
                discountEnd:values.discountEnd,
            }, {
                headers: {

                    Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

                }})
                .then(res=>{
                    console.log(res.data);
                    setRecordForEdit(null);
                    fetch('http://localhost:8080/product/getProducts',{
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
                        name="productName"
                        label="Full Name"
                        value={values.productName}
                        onChange={handleInputChange}
                        error={errors.productName}
                        disabled
                    />   {/*READ ONLY*/}
                    <Controls.Input
                        label="category"
                        name="category"
                        value={values.category}
                        onChange={handleInputChange}
                        error={errors.category}
                        disabled/>
                    <Controls.Input
                        label="genre"
                        name="genre"
                        value={values.genre}
                        onChange={handleInputChange}
                        error={errors.genre}
                        disabled/>

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input
                        label="Discount Ratio"
                        name="discountRatio"
                        value={values.discountRatio}
                        onChange={handleInputChange}
                        error={errors.discountRatio}
                    />
                    <Controls.Input
                        label="Discount Start"
                        name="discountStart"
                        value={values.discountStart}
                        onChange={handleInputChange}
                        error={errors.discountStart}
                    />
                    <Controls.Input
                        label="Discount End"
                        name="discountEnd"
                        value={values.discountEnd}
                        onChange={handleInputChange}
                        error={errors.discountEnd}
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