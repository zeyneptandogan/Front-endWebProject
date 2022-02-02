import React, {useState,useEffect} from "react";
import useTable from "../../../Components_foradmin/main_productmanager/Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,Paper } from "@material-ui/core";
import Controls from "../../../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../../../Components_foradmin/main_productmanager/ConfirmDialog";
import Notification from "../../../Components_foradmin/main_productmanager/Notification";
import Axios from "axios";
import UserStore from "../../../Login-SignUp/UserStore";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlined from '@material-ui/icons/Delete';
import EditProduct from "./Edit_comment";
import Popup from "../../../Components_foradmin/main_productmanager/Table_product/Popup";

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

    { id: 'productId', label: 'Product Name' },
    { id: 'fullname', label: 'Used Name' },
    { id: 'comment', label: 'Comment' },
    { id: 'status', label: 'Status' },

    { id:'actions',label:'Actions',disableSorting:true}
]


function Comment_table(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    const [openPopup,setOpenPopup]=useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [recordForEdit, setRecordForEdit] = useState(null)


    useEffect(()=>{
        getListRefundsbystatusfromAPI();
    },[]);

    const handleSearch = e => { //filtreleme yapmadan alabiliriz status lere göre ayrı ayrı
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else    //filter part!! comment e ve user ın name ine göre
                    return items.filter(x => x.productId.toString().includes(target.value.toString()))

            }
        })
    }

    const openInPopup = (item) => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const getListRefundsbystatusfromAPI = async () => {

            return fetch('http://localhost:8080/comments/getCommentsOfUser?userId=' + parseFloat(UserStore.userId), {  //burası değişecek
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("List of refunds: ", json);
                    setRecords(json);
                }).catch((error) => {
                    console.error(error);
                });
    };

    const onRemove = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.delete('http://localhost:8080/comments/deleteCommentsOfUser?userId='+ parseFloat(id))
            .then(res=>{
                console.log("burdaa",res)
                if (res.status===200) {

                    fetch('http://localhost:8080/comments/getCommentsOfUser?userId=' + parseFloat(UserStore.userId),{
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of refund requests: ", json);
                            setRecords(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    if (res.status === 400) {
                        alert("Not rejected");
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
    const onReject = id => {  //buraya reject api gelecek
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.delete('http://localhost:8080/comments/deleteComment?id='+ parseFloat(id))
            .then(res=>{
                console.log("burdaa",res)
                if (res.status===200) {

                    fetch('http://localhost:8080/comments/getCommentsOfUser?userId=' + parseFloat(UserStore.userId),{
                        method: 'GET',
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of refund requests: ", json);
                            setRecords(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    if (res.status === 400) {
                        alert("Not rejected");
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
            {records.length===0 ?
                <div className="main2">
                    <div className="main__container">
                        <Paper elevation={20} className={classes.pageContent}>
                            <p>No comment is found!</p>
                        </Paper>
                    </div>
                </div> :
            <div className="main2">
                <div className="main__container">
                    <Paper elevation={20} className={classes.pageContent}>
                        <Toolbar>
                            {/* <Controls.Input
                                label="Search Product ID"
                                className={classes.searchInput}
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>)
                                }}
                                onChange={handleSearch}
                            />*/}
                            <Controls.Button
                                text="Remove All"
                                variant="outlined"
                                startIcon={<CloseIcon/>}
                                className={classes.newButton}
                                onClick={()=>onRemove(UserStore.userId)}
                            />
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.id}>

                                            <TableCell>{item.productModel.productName}</TableCell>
                                            <TableCell>{item.commentsModel.fullname}</TableCell>
                                            <TableCell>{item.commentsModel.comment}</TableCell>
                                            <TableCell>{item.commentsModel.status}</TableCell>

                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => {  //reject case
                                                        openInPopup(item.commentsModel)
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="gray"
                                                    onClick={() => {  //reject case
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Delete this comment?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => { onReject(item.commentsModel.id) }
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
                    <Popup
                        title="Edit Comment"
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
            </div> }
        </>
    );
}

export default Comment_table;