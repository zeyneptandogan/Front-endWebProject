import React, {useState,useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import Controls from "../controls/Controls";
import useTable from "./main_productmanager/Datatable";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Search} from "@material-ui/icons";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    { id: 'addressId', label: 'Address Id' },
    { id: 'orderId', label: 'Order Id' },
    { id: 'Orderamount', label: 'Order Amount' },
    { id: 'totalprice', label: 'Total price' },
    { id: 'boughtDate', label: 'Bought Date' },
    { id: 'refundableDate', label: 'Refundable Date' },
    { id:'actions',label:'Invoice',disableSorting:true}
]

function Searchdata(){

    const[invoicedata,setInvoicedata]=useState([]);
    const[startDate,setStartdate]=useState('');
    const[endDate,setendDate]=useState('');
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const classes = useStyles();
    const {TblContainer, TblHead, TblPagination,recordsAfterPagingAndSorting }= useTable(invoicedata,headCells,filterFn);

    useEffect(()=>{
        getListInvoicesfromAPI();
    },[]);

    function convert(str) {
        let date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
        return [ date.getFullYear(), mnth, day ].join("-");
    }



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

    console.log(convert(startDate));
    console.log(convert(endDate));
    const getListInvoicesfromAPI = () => {

        fetch('http://localhost:8080/order/allInvoice', {  //burası invoices
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of refunds: ", json);
                setInvoicedata(json.invoices);

            }).catch((error) => {
                console.error(error);
            });
    };

    console.log(invoicedata);
    const onsubmit = () => {

        fetch('http://localhost:8080/order/allInvoiceInRange2?begin=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("List of pending: ", json);
                setInvoicedata(json.invoices);
            }).catch((error) => {
            console.error(error);
        });

    }

    const Changedate = (e) => {
        setStartdate(e);
    };
    const enddate = (e) => {
        setendDate(e);
    };
    return (
        <>
            <main>
                <div className="main__container">
                    <Paper className={classes.pageContent}>
                        <Toolbar>
                            <form onSubmit={onsubmit}>
                                <div className="row hdr" >
                                    <div className="col-sm-3 form-group">  </div>
                                    <div className="col-sm-3 form-group">
                                        <DatePicker className="form-control"
                                                    selected={startDate} placeholderText="Select Date" showPopperArrow={false}
                                                    onChange={Changedate}
                                        />
                                    </div>
                                    <div className="col-sm-3 form-group">
                                        <DatePicker className="form-control"
                                                    selected={endDate} placeholderText="Select Date" showPopperArrow={false}
                                                    onChange={enddate}
                                        />
                                    </div>
                                    <div className="col-sm-3 form-group">
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { onsubmit() //reject case
                                            }}
                                        >
                                            <Search fontSize="small"/>
                                        </Controls.ActionButton>
                                        {/*<button type="submit" className="btn">Search</button>*/}
                                    </div>
                                </div>
                            </form>
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.orders[0].id}>
                                            <TableCell>{item.userModel.id}</TableCell>
                                            <TableCell>{item.addressModel.id}</TableCell>
                                            <TableCell>{item.orders[0].orderModel.orderId}</TableCell>
                                            <TableCell>{item.orders.length}</TableCell>
                                            <TableCell>{item.totalPrice}</TableCell> {/*Total olacak bu*/}
                                            <TableCell>{item.orders[0].orderModel.boughtDate}</TableCell>
                                            <TableCell>{item.orders[0].orderModel.refundableDate}</TableCell>
                                            <TableCell>
                                                    <Controls.ActionButton
                                                        color="primary"
                                                        onClick={() => {
                                                            pdfGenerate(item)
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="small"/>
                                                    </Controls.ActionButton>
                                                </TableCell>
                                        </TableRow>)
                                    )
                               }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                </div>
            </main>
        </>
    )
}

export default Searchdata;