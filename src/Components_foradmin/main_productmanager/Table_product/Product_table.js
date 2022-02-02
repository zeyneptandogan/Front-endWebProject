import React, {useState,useEffect} from "react";
import useTable from "../Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,InputAdornment,Paper } from "@material-ui/core";
import {DeleteForeverOutlined, Search} from "@material-ui/icons";
import Controls from "../../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./Popup";
import Addproduct2 from "./Addproduct2";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import EditProduct from "./EditProduct";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position:'absolute',
        right:'10px',
    }
}))


const headCells = [
    { id: 'productName', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'genre', label: 'Genre' },
    { id: 'distributor', label: 'Distributor' },
    { id: 'currentPrice', label: 'Price' },
    { id: 'discountRatio', label: 'Discount' },
    { id: 'currentStock', label: 'Current stock' },
    {id:'actions',label:'Actions',disableSorting:true}
]

function Product_table(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    const [openPopup,setOpenPopup]=useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(()=>{
        getListInvoicesfromAPI();
    },[]);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else    //filter part!!
                    return items.filter(x => x.productName.toLowerCase().includes(target.value.toLowerCase())||x.category.toLowerCase().includes(target.value.toLowerCase()))

            }
        })
    }
    const getListInvoicesfromAPI = async () => {
        return fetch('http://localhost:8080/product/getProducts',{  //burası değişecek
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
    };

   /* const addOrEdit = (values, resetForm) => {
        Axios.post("http://localhost:8080/address/add",{
            productname: values.productname,
            category: values.category,
            price: values.price,
            imageurl: values.imageurl,
            genre: values.genre,
            year: values.year,
            description: values.description,
            writer: values.writer,
            distributor:values.distributor,
        })
            .then(res=>{
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        resetForm()
    }*/
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const openInPopup2 = () => {
        //document.getElementById("add").reset()
        setOpenPopup(true)
    }


    const onDelete = id => {  //buraya delete api gelecek
        setConfirmDialog({
            ...confirmDialog,
            ...confirmDialog,
            isOpen: false
        })
        fetch('http://localhost:8080/productManager/deleteProduct?id='+ id,{  //burası değişecek
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then(res=>{
                console.log(res)
                if (res.status===200) {

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
                }
                else {
                    if (res.status === 400) {
                        alert("Not deleted");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            });

        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }


    return (
        <>
            <main>
                <div className="main__container">
                    <Paper className={classes.pageContent}>
                        <Toolbar>
                            <Controls.Input
                                label="Search Product"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />
                            <Controls.Button
                                text="Add new"
                                variant="outlined"
                                startIcon={<AddIcon/>}
                                className={classes.newButton}
                                onClick={()=>openInPopup2()}
                            />
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                 {
                                    recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.productId}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.genre}</TableCell>
                                            <TableCell>{item.distributor}</TableCell>
                                            <TableCell>{item.currentPrice}</TableCell>
                                            <TableCell>{item.discountRatio}</TableCell>
                                            <TableCell>{item.currentStock}</TableCell>
                                            <TableCell>
                                                <Controls.ActionButton color="primary"
                                                                       onClick={() => { openInPopup(item) }}>


                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton color="gray"
                                                                       onClick={() => {
                                                                           setConfirmDialog({
                                                                               isOpen: true,
                                                                               title: 'Are you sure to delete this product?',
                                                                               subTitle: "You can't undo this operation",
                                                                               onConfirm: () => { onDelete(item.productId) }
                                                                           })
                                                                       }}
                                                >
                                                    <DeleteForeverOutlined fontSize="small"/>
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                    {recordForEdit === null ?
                    <Popup
                        title="Add New Product"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >

                        <Addproduct2
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            records={records}
                            setRecords={setRecords}
                            notify={notify}
                            setNotify={setNotify}

                        />
                    </Popup> :
                        <Popup
                            title="Edit Product"
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                        >
                            <EditProduct
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                                records={records}
                                setRecords={setRecords}
                                notify={notify}
                                setNotify={setNotify}
                                recordForEdit={recordForEdit}  //
                                setRecordForEdit={setRecordForEdit} //

                            />
                        </Popup>}
                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </div>
            </main>
        </>
    );
}

export default Product_table;