import React, {useState,useEffect} from "react";
import useTable from "../Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,InputAdornment,Paper } from "@material-ui/core";
import {Search} from "@material-ui/icons";
import Controls from "../../../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../ConfirmDialog";
import Notification from "../Notification";
import {useParams} from "react-router-dom";
import CheckIcon from '@material-ui/icons/Check';


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
    { id: 'fullname', label: 'User Name' },
    { id: 'product_name', label: 'Product Name' },
    { id: 'comment', label: 'Comment' },
    { id: 'status', label: 'Status' },
    { id:'actions',label:'Actions',disableSorting:true}
]

function Comment_table(){
    const status = useParams();
    console.log(status.comment);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    //const [openPopup,setOpenPopup]=useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



    useEffect(()=>{
        getListCommentsbystatusfromAPI();
    },[status.comment]);

    const handleSearch = e => { //filtreleme yapmadan alabiliriz status lere göre ayrı ayrı
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else    //filter part!! comment e ve user ın name ine göre
                    return items.filter(x => x.fullname.toLowerCase().includes(target.value.toLowerCase())||x.comment.toLowerCase().includes(target.value.toLowerCase())||x.product_name.toLowerCase().includes(target.value.toLowerCase()))

            }
        })
    }


    const getListCommentsbystatusfromAPI = async () => {
        if(status.comment === "getPendingComment") {
            return fetch('http://localhost:8080/productManager/getCommentPending', {  //burası değişecek
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                    Accept: 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("List of pendings: ", json);
                    setRecords(json);
                }).catch((error) => {
                    console.error(error);
                });
        }
        else if(status.comment === "getApprovedComment"){
            return fetch('http://localhost:8080/productManager/getCommentApproved', {  //burası değişecek
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                    Accept: 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("List of approved: ", json);
                    setRecords(json);
                }).catch((error) => {
                    console.error(error);
                });
        }
        else {
            return fetch('http://localhost:8080/productManager/getCommentRejected', {  //burası değişecek
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                    Accept: 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("List of rejected: ", json);
                    setRecords(json);
                }).catch((error) => {
                    console.error(error);
                });
        }
    };

    const onReject = id => {  //buraya reject api gelecek
        setConfirmDialog({
            ...confirmDialog,
            ...confirmDialog,
            isOpen: false
        })
        fetch('http://localhost:8080/productManager/rejectComment?id='+ parseFloat(id),{  //burası reject
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then(res=>{
                console.log(res)
                if (res.status===200) {

                    fetch('http://localhost:8080/productManager/getCommentPending',{  //burası pending
                        method: 'GET',
                        headers: {
                            Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of pending: ", json);
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
            message: 'Rejected Successfully',
            type: 'error'
        })
    }
    const onApprove = id => {  //buraya approve api gelecek
        setConfirmDialog({
            ...confirmDialog,
            ...confirmDialog,
            isOpen: false
        })
        fetch('http://localhost:8080/productManager/approveComment?id='+ parseFloat(id),{  //burası approve
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then(res=>{
                console.log(res)
                if (res.status===200) {

                    fetch('http://localhost:8080/productManager/getCommentPending',{  //burası pending
                        method: 'GET',
                        headers: {
                            Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of pending: ", json);
                            setRecords(json);
                        }).catch((error) => {
                        console.error(error);
                    });
                }
                else {
                    if (res.status === 400) {
                        alert("Not approved");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                }

            });
        setNotify({
            isOpen: true,
            message: 'Approved Successfully',
            type:'success',
        })
    }

    return (
        <>
            <main>
                <div className="main__container">
                    <Paper className={classes.pageContent}>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                   /* menuItem.map((item) =>{
                                        return <div className="item-con" key={item.id}>
                                            <div className="item-container">
                                                <img src={item.image} alt=""/>
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>*/
                                    records.map(item =>
                                        (<TableRow key={item.id}>   {/*BURAYA UNIQUE BISEY KOYUYORDUK AMA..*/}
                                            <TableCell>{item.fullname}</TableCell>
                                            <TableCell>{item.product_name}</TableCell>
                                            <TableCell>{item.comment}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            {item.status !== "Pending"?"":
                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="green"
                                                    onClick={() => {  //reject case
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Approve this comment?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => { onApprove(item.id) }
                                                        })
                                                    }}
                                                >
                                                    <CheckIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="secondary"
                                                    onClick={() => {  //reject case
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Reject this comment?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => { onReject(item.id) }
                                                        })
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </TableCell>}
                                        </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                    </Paper>
                    {/*<Popup
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
                    </Popup>
                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                    <ConfirmDialog
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />*/}
                </div>
            </main>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
}

export default Comment_table;