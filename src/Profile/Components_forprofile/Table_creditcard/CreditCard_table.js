import React, {useState,useEffect} from "react";
import useTable from "../../../Components_foradmin/main_productmanager/Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,Paper } from "@material-ui/core";
import Controls from "../../../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../../Components_foradmin/main_productmanager/Table_product/Popup";
import Addproduct2 from "./Add_creditcard";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import EditProduct from "./Edit_creditcard";
import Notification from "../../../Components_foradmin/main_productmanager/Notification";
import ConfirmDialog from "../../../Components_foradmin/main_productmanager/ConfirmDialog";
import Axios from "axios";
import UserStore from "../../../Login-SignUp/UserStore";
import DeleteOutlined from '@material-ui/icons/Delete';

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
    { id: 'full_name', label: 'Full Name' },
    { id: 'creditcard_number', label: 'Credit card no' },
    { id: 'end_date', label: 'End Date' },
    { id: 'cvv', label: 'CVV' },
    { id: 'type', label: 'Type' },
    {id:'actions',label:'Actions',disableSorting:true}
]

function CreditCard_table(){
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
        return (Axios.post("http://localhost:8080/creditCard/getByEmail",{
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

            }))
    };


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
        fetch('http://localhost:8080/creditCard/remove?id='+ id + '&userId=' + UserStore.userId,{
            method: 'GET',
        })
            .then(res=>{
                console.log(res)
                if (res.status===200) {

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

    const onRemove = () => {  //BURASI KREDİ KARTI İÇİN DÜZENLENECEK
        setConfirmDialog({
            ...confirmDialog,
            ...confirmDialog,
            isOpen: false
        })
        Axios.post("http://localhost:8080/creditCard/removeAll",{
            email: UserStore.email,
        })
            .then(res=>{
                console.log(res)
                if (res.status===200) {
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

        setNotify({
            isOpen: true,
            message: 'Removed Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <div className="main2" >
                <div className="main__container">
                    <Paper elevation={20} className={classes.pageContent}>
                        <Toolbar>
                            {/*<Controls.Input
                                label="Search Product"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />*/}
                            <Controls.Button
                                text="Remove All"
                                variant="outlined"
                                startIcon={<CloseIcon/>}
                                className={classes.newButton}
                                onClick={()=>{
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: 'Are you sure to delete all credit cards?',
                                        subTitle: "You can't undo this operation",
                                        onConfirm: () => { onRemove() }
                                    })
                                }}
                            />
                            <Controls.Button
                                text="Add new"
                                variant="outlined"
                                startIcon={<AddIcon/>}
                                //className={classes.newButton}
                                onClick={()=>openInPopup2()}
                            />
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                 {
                                    recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.id}>
                                            <TableCell>{item.full_name}</TableCell>
                                            <TableCell>************{item.creditcard_number.substring(12,16)}</TableCell>
                                            <TableCell>{item.end_date}</TableCell>
                                            <TableCell>{item.cvv}</TableCell>
                                            <TableCell>{item.type}</TableCell>

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
                                                                               onConfirm: () => { onDelete(item.id) }
                                                                           })
                                                                       }}
                                                >
                                                    <DeleteOutlined fontSize="small"/>
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
                        title="Add New Credit Card"
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
                            title="Edit Credit Card"
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
            </div>
        </>
    );
}

export default CreditCard_table;