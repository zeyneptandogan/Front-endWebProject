import React, {useState,useEffect} from "react";
import useTable from "../../../Components_foradmin/main_productmanager/Datatable";
import {TableBody,Toolbar,makeStyles, TableCell, TableRow,Paper } from "@material-ui/core";
import Controls from "../../../controls/Controls";
import ConfirmDialog from "../../../Components_foradmin/main_productmanager/ConfirmDialog";
import Notification from "../../../Components_foradmin/main_productmanager/Notification";
import Axios from "axios";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import jsPDFInvoiceTemplate, {OutputType} from "jspdf-invoice-template";
import UserStore from "../../../Login-SignUp/UserStore";
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';

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
    { id: 'productname', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'genre', label: 'Genre' },
    { id: 'boughtPrice', label: 'Bought Price' },
    { id: 'boughtDate', label: 'Bought Date' },
    { id: 'currentSituation', label: 'Current Situation' },
    { id:'Refund',label:'Request',disableSorting:true}
]


function Order_table(){
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [records,setRecords]=useState([]); //this is the records in table
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(records,headCells,filterFn);
    const classes = useStyles();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })



    useEffect(()=>{
        getListorderfromAPI();
    },[]);



    const getListorderfromAPI = async () => {

            return fetch('http://localhost:8080/order/allInvoiceOfUser?email=' + UserStore.email, {  //burası değişecek URL DEĞİŞECEK!!!
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("List of refunds: ", json);
                    setRecords(json.invoices);
                }).catch((error) => {
                    console.error(error);
                });
    };
    const pdfGenerate=(items)=>{
        let invoiceDetail = {
            outputType: OutputType.DataUrlNewWindow,
            returnJsPDFDocObject: true,
            fileName: "BookStore Invoice",
            orientationLandscape: false,
            logo: {
                src: "/images/bookstore.PNG",
                width: 53.33, //aspect ratio = width/height
                height: 26.66,
                margin: {
                    top: 0, //negative or positive num, from the current position
                    left: 0 //negative or positive num, from the current position
                }
            },
            business: {
                name: "BOOKSTORE",
                address: "Sabanci Univ",
                phone: "(+355) 069 11 11 123",
                email: "bookstore@example.com",
                email_1: "",
                website: "bookstore",
            },
            contact: {
                label: "Invoice issued for:",
                name: items.userModel.name,
                address: items.addressModel.full_address,
                phone: items.userModel.mobile,
                email: items.userModel.email,
                otherInfo: "",
            },
            invoice: {
                label: "Invoice #",
                invTotalLabel: "Total:",
                num: 1998,  //num koymadan invoice başlığını basmıyo..
                invDate: items.orders[0].orderModel.boughtDate,
                invGenDate: items.orders[0].orderModel.boughtDate,
                header: ["#", "Product Name", "Category", "Quantity","Writer", "Price"],
                headerBorder: false,
                tableBodyBorder: false,
                table:   items.orders.map((item, index) =>({
                    num: index + 1,    //ne olursa olsun aynı sırayla basıyor..
                    desc: item.productModel.productName,
                    price: item.productModel.category,
                    quantity: 1,
                    unit: item.productModel.writer,
                    total: item.orderModel.boughtPrice,

                })),
                invTotal: (parseFloat(items.totalPrice)).toString(),
                invCurrency: "ALL",

                invDescLabel: "Invoice Note",
                invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
            },
            footer: {
                text: "The invoice is created on a computer and is valid without the signature and stamp.",
            },
            pageEnable: true,
            pageLabel: "Page ",
        };
        jsPDFInvoiceTemplate({...invoiceDetail});

    }


    const onRequest = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Axios.put('http://localhost:8080/order/refund?id='+ parseFloat(id) )
            .then(res=>{
                console.log(res)
                if (res.status===200) {

                    fetch('http://localhost:8080/order/allInvoiceOfUser?email=' + UserStore.email, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            console.log("List of refunds: ", json);
                            setRecords(json.invoices);
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
            message: 'Refund Request is sent successfully',
            type:'success',
        })
    }

    console.log([...records].reverse())
    return (
        <>
            {records.length===0 ?
                <div className="main2">
                    <div className="main__container">
                        <Paper elevation={20} className={classes.pageContent}>
                            <p>No history is found!</p>
                        </Paper>
                    </div>
                </div> :
                <div className="main2">
                    <div className="main__container">
                        {[...records].reverse().map(items =>
                            <Paper elevation={20} className={classes.pageContent}>
                                <Toolbar>
                                    <Controls.Button
                                        text="View Invoice"
                                        variant="outlined"
                                        startIcon={<InsertDriveFileIcon/>}
                                        className={classes.newButton}
                                        onClick={() => {
                                            pdfGenerate(items)
                                        }}
                                    />
                                </Toolbar>
                                <TblContainer>
                                    <TblHead />
                                    <TableBody>
                                        {
                                            items.orders.map(item =>
                                                (<TableRow key={item.orderModel.id}>
                                                    <TableCell>{item.productModel.productName}</TableCell>
                                                    <TableCell>{item.productModel.category}</TableCell>
                                                    <TableCell>{item.productModel.genre}</TableCell>
                                                    <TableCell>{item.orderModel.boughtPrice}</TableCell>
                                                    <TableCell>{item.orderModel.boughtDate}</TableCell>
                                                    <TableCell>{item.orderModel.currentSituation}</TableCell>
                                                    {item.orderModel.currentSituation !== "Processing" && item.orderModel.currentSituation !== "Delivered"
                                                    && item.orderModel.currentSituation !== "In-transit"
                                                        ? ""
                                                        :
                                                        (<TableCell>
                                                            <Controls.ActionButton
                                                                color="green"
                                                                onClick={() => {  //reject case
                                                                    setConfirmDialog({
                                                                        isOpen: true,
                                                                        title: 'Reject this refund request?',
                                                                        subTitle: "You can't undo this operation",
                                                                        onConfirm: () => { onRequest(item.orderModel.id) }
                                                                    })
                                                                }}
                                                            >
                                                                <AttachMoneyOutlinedIcon fontSize="small"/>
                                                            </Controls.ActionButton>
                                                        </TableCell> )}

                                                </TableRow>)
                                            )
                                        }
                                    </TableBody>
                                </TblContainer>
                            </Paper>)
                        }
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
            }

        </>
    );
}

export default Order_table;