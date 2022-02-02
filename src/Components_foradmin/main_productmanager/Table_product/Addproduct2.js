import React from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../../controls/Controls";
import { useForm, Form } from '../../useForm';
import Axios from 'axios';

/*const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]*/

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
}

export default function Addproduct2(props) {
    const {openPopup, setOpenPopup,records,setRecords,notify,setNotify} = props;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('productName' in fieldValues)
            temp.productName = fieldValues.productName ? "" : "This field is required."
        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "This field is required."
        if ('initialPrice' in fieldValues)
            temp.initialPrice = fieldValues.initialPrice ? "" : "This field is required."
        if ('imgUrl' in fieldValues)
            temp.imgUrl = fieldValues.imgUrl ? "" : "This field is required."
        if ('cost' in fieldValues)
            temp.cost = fieldValues.cost ? "" : "This field is required."
        if ('year' in fieldValues)
            temp.year = fieldValues.year ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."
        if ('writer' in fieldValues)
            temp.writer = fieldValues.writer ? "" : "This field is required."
        if ('distributor' in fieldValues)
            temp.distributor = fieldValues.distributor? "" : "This field is required."
        if ('initialStock' in fieldValues)
            temp.initialStock = fieldValues.initialStock? "" : "This field is required."

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

                Axios.post("http://localhost:8080/productManager/addProduct",{   //url degisecek
                    productName: values.productName,
                    category: values.category,
                    initialPrice: values.initialPrice,
                    currentPrice:values.initialPrice,
                    cost:values.cost,
                    imgUrl: values.imgUrl,
                    genre: values.genre,
                    year: values.year,
                    description: values.description,
                    distributor: values.distributor,
                    initialStock:values.initialStock,
                    currentStock:values.initialStock,
                    writer:values.writer,
                }, {
                    headers: {

                        Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",

                    }})
                    .then(res=>{
                        console.log(res.data);
                        fetch('http://localhost:8080/product/getProducts',{  //burası değişecek
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
                        //history.push("/c");
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
                //sayfaya direkt yeni eklenen düşmeyebilir ona bak!! çünkü videoda ayrıca başka bir şey yapıyor dk21

            }
        }


        return (

            <Form id="add" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.Input
                            name="productName"
                            label="Full Name"
                            value={values.productName}
                            onChange={handleInputChange}
                            error={errors.productName}
                        />
                        <Controls.Input
                            label="category"
                            name="category"
                            value={values.category}
                            onChange={handleInputChange}
                            error={errors.category}
                        />
                        <Controls.Input
                            label="genre"
                            name="genre"
                            value={values.genre}
                            onChange={handleInputChange}
                            error={errors.genre}
                        />
                        <Controls.Input
                            label="initialPrice"
                            name="initialPrice"
                            value={values.initialPrice}
                            onChange={handleInputChange}
                            error={errors.initialPrice}
                        />
                        <Controls.Input
                            label="cost"
                            name="cost"
                            value={values.cost}
                            onChange={handleInputChange}
                            error={errors.cost}
                        />
                        <Controls.Input
                            label="initialStock"
                            name="initialStock"
                            value={values.initialStock}
                            onChange={handleInputChange}
                            error={errors.initialStock}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <Controls.Input
                            label="imgUrl"
                            name="imgUrl"
                            value={values.imgUrl}
                            onChange={handleInputChange}
                            error={errors.imgUrl}
                        />
                        <Controls.Input
                            label="year"
                            name="year"
                            value={values.year}
                            onChange={handleInputChange}
                            error={errors.year}
                        />
                        <Controls.Input
                            label="description"
                            name="description"
                            value={values.description}
                            onChange={handleInputChange}
                            error={errors.description}
                        />
                        <Controls.Input
                            label="distributor"
                            name="distributor"
                            value={values.distributor}
                            onChange={handleInputChange}
                            error={errors.distributor}
                        />
                        <Controls.Input
                            label="writer"
                            name="writer"
                            value={values.writer}
                            onChange={handleInputChange}
                            error={errors.writer}
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