import React, {useState,useEffect} from "react";
import useTable from "../../main_productmanager/Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,InputAdornment,Paper } from "@material-ui/core";
import {Search} from "@material-ui/icons";
import Controls from "../../../controls/Controls";
import Popup from "../../main_productmanager/Table_product/Popup";
import Editdiscount from "./EditDiscount";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Notification from "../../main_productmanager/Notification";
import ConfirmDialog from "../../main_productmanager/ConfirmDialog";


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
    { id: 'currentPrice', label: 'Price' },
    { id: 'discountRatio', label: 'Discount' },
    { id: 'discountStart', label: 'Discount Start' },
    { id: 'discountEnd', label: 'Discount End' },
    {id:'actions',label:'Actions',disableSorting:true}
]

function Product_edittable(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    const [openPopup,setOpenPopup]=useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(()=>{
        getListproductsfromAPI();
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
    const getListproductsfromAPI = async () => {
        return fetch('http://localhost:8080/product/getProducts',{
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

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
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
                                            <TableCell>{item.currentPrice}</TableCell>
                                            <TableCell>{item.discountRatio}</TableCell>
                                            <TableCell>{item.discountStart}</TableCell>
                                            <TableCell>{item.discountEnd}</TableCell>
                                            <TableCell>
                                                <Controls.ActionButton color="primary"
                                                                       onClick={() => { openInPopup(item) }}>


                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                    <Popup
                        title="Edit Product"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                    >
                        <Editdiscount
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            records={records}
                            setRecords={setRecords}
                            notify={notify}
                            setNotify={setNotify}
                            recordForEdit={recordForEdit}  //
                            setRecordForEdit={setRecordForEdit} //
                        />
                    </Popup>
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

export default Product_edittable;