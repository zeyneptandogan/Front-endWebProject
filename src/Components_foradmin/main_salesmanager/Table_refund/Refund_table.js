import React, {useState,useEffect} from "react";
import useTable from "../../main_productmanager/Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,InputAdornment,Paper } from "@material-ui/core";
import { Search} from "@material-ui/icons";
import Controls from "../../../controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import ConfirmDialog from "../../main_productmanager/ConfirmDialog";
import Notification from "../../main_productmanager/Notification";
import CheckIcon from '@material-ui/icons/Check';
import Axios from "axios";


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
    { id: 'userId', label: 'User Id' },
    { id: 'productId', label: 'Product Id' },
    { id: 'orderId', label: 'Order Id' },
    { id: 'boughtPrice', label: 'Bought Price' },
    { id: 'boughtDate', label: 'Bought Date' },
    { id: 'endProcess', label: 'End Process' },
    { id: 'endShipment', label: 'End Shipment' },
    { id:'actions',label:'Actions',disableSorting:true}
]


function Refund_table(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    //const [openPopup,setOpenPopup]=useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



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


    const getListRefundsbystatusfromAPI = async () => {

            return fetch('http://localhost:8080/order/refundRequests', {  //burası değişecek
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

    const onReject = id => {  //buraya reject api gelecek
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.put('http://localhost:8080/order/disapproveRefund?id='+ parseFloat(id) + "&b=false")
            .then(res=>{
                console.log("burdaa",res)
                if (res.status===200) {

                    fetch('http://localhost:8080/order/refundRequests',{  //burası refund
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
            message: 'Rejected Successfully',
            type: 'error'
        })
    }
    const onApprove = id => {  //buraya approve api gelecek
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.put('http://localhost:8080/order/approveRefund?id='+ parseFloat(id) + "&b=true")
            .then(res=>{
                console.log(res)
                if (res.status===200) {

                    fetch('http://localhost:8080/order/refundRequests',{  //burası refund
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
                        <Toolbar>
                            <Controls.Input
                                label="Search Product ID"
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
                                        (<TableRow key={item.id}>
                                            <TableCell>{item.userId}</TableCell>
                                            <TableCell>{item.productId}</TableCell>
                                            <TableCell>{item.orderId}</TableCell>
                                            <TableCell>{item.boughtPrice}</TableCell>
                                            <TableCell>{item.boughtDate}</TableCell>
                                            <TableCell>{item.endProcess}</TableCell>
                                            <TableCell>{item.endShipment}</TableCell>
                                            <TableCell>
                                                <Controls.ActionButton
                                                    color="green"
                                                    onClick={() => {  //reject case
                                                        setConfirmDialog({
                                                            isOpen: true,
                                                            title: 'Approve this refund request?',
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
                                                            title: 'Reject this refund request?',
                                                            subTitle: "You can't undo this operation",
                                                            onConfirm: () => { onReject(item.id) }
                                                        })
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small"/>
                                                </Controls.ActionButton>
                                            </TableCell>
                                        </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
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

export default Refund_table;