import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    const [values2, setValues2] = useState(initialFValues);
    const [errors2, setErrors2] = useState({});

    const handleInputChange2 = e => {
        const { name, value } = e.target
        setValues2({
            ...values2,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm2 = () => {
        setValues2(initialFValues);
        setErrors2({})
    }



    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        values2,
        setValues2,
        errors2,
        setErrors2,
        handleInputChange2,
        resetForm2
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}