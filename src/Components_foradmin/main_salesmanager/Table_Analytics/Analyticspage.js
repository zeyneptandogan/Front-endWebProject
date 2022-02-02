import React, { useState} from "react";
import "../Dashboard.css"
import {makeStyles, Paper, Toolbar} from "@material-ui/core";
import DatePicker from "react-datepicker";
import Controls from "../../../controls/Controls";
import {Search} from "@material-ui/icons";
import BarChart_revenue from "./AnalyticsCharts/BarChart_revenue";
import BarChart_profit from "./AnalyticsCharts/BarChart_profit";
import PieChart_status from "./AnalyticsCharts/PieChart_status";
import BarChart_refund from "./AnalyticsCharts/BarChart_refund";
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

export function convert(str) {
    let date = new Date(str),
        mnth = ("0" + (date.getMonth()+1)).slice(-2),
        day  = ("0" + date.getDate()).slice(-2);
    return [ date.getFullYear(), mnth, day ].join("-");
}

function Analyticspage(){
    const [revenuebycategory,setrevenuebycategory] = useState([]);   //
    const [profitbycategory,setprofitbycategory] = useState([]);
    const [status,setStatus] = useState([]);
    const[refundbycategory,setrefundbycategory]=useState([]);
    //for graphs

    const[startDate,setStartdate]=useState('');
    const[endDate,setendDate]=useState('');
    //for date


    const classes = useStyles();

   /* useEffect(()=>{
        getrevenuebycategoryfromAPI();
        getprofitbycategoryfromAPI();
        getstatusfromAPI();
        getrefundbycategoryfromAPI();
    },[]);

    const getrevenuebycategoryfromAPI =  () => {   //
        fetch('http://localhost:8080/salesManager/getProfitByDateCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("revenue by category", json);
                setrevenuebycategory(json);
            }).catch((error) => {
                console.error(error);
            });
    };

    const getprofitbycategoryfromAPI =  () => {   //
        fetch('http://localhost:8080/salesManager/getProfitByDateCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("profit by category:", json);

                setprofitbycategory(json);

            }).catch((error) => {
                console.error(error);
            });
    };

    const getstatusfromAPI =  () => { //
        fetch('http://localhost:8080/salesManager/currentSituationByDate?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("status:", json);
                setStatus(json);
            }).catch((error) => {
                console.error(error);
            });
    };
    const getrefundbycategoryfromAPI = async () => {
        fetch('http://localhost:8080/salesManager/refundedAmountByCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic cHJvZHVjdF9tYW5hZ2VyQGJvb2tzdG9yZS5jb206YWRtaW5fcHJvZHVjdA==",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment by status:", json);
                setrefundbycategory(json);
            }).catch((error) => {
                console.error(error);
            });

    };*/

    const onsubmit = () => {

        fetch('http://localhost:8080/salesManager/getRevenueByDateCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("revenue by category", json);
                setrevenuebycategory(json);
            }).catch((error) => {
            console.error(error);
        });
        fetch('http://localhost:8080/salesManager/getProfitByDateCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("profit by category:", json);

                setprofitbycategory(json);

            }).catch((error) => {
            console.error(error);
        });
        fetch('http://localhost:8080/salesManager/currentSituationByDate?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("status:", json);
                setStatus(json);
            }).catch((error) => {
            console.error(error);
        });
        fetch('http://localhost:8080/salesManager/refundedAmountByCategory?start=' + convert(startDate) + '&end='+ convert(endDate) ,{  //burası pending
            method: 'GET',
            headers: {
                Authorization:"Basic c2FsZXNfbWFuYWdlckBib29rc3RvcmUuY29tOmFkbWluX3NhbGVz",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("Comment by status:", json);
                setrefundbycategory(json);
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
    return(
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
                                        onClick={() => { onsubmit()
                                        }}
                                    >
                                        <Search fontSize="small"/>
                                    </Controls.ActionButton>
                                </div>
                            </div>
                        </form>
                    </Toolbar>
                    {revenuebycategory.length === 0 && profitbycategory.length === 0 && status.length === 0 && refundbycategory.length === 0 ?
                        <p>Please enter date interval to see the charts</p> :
                        <div className="charts">
                            <div className="charts__left">
                                <div className="charts__left__title">
                                    <div>
                                        <h1>Revenue in a Given Date Range</h1>
                                        <p>by Category</p>
                                    </div>
                                    <i className="fa fa-address-card"></i>
                                </div>
                                <BarChart_revenue
                                    revenue={revenuebycategory}/>
                            </div>
                            <div className="charts__right">
                                <div className="charts__right__title">
                                    <div>
                                        <h1>Profit in a Given Date Range</h1>
                                        <p>by Category</p>
                                    </div>
                                    <i className="fa fa-address-card"></i>
                                </div>
                                <BarChart_profit
                                    profit={profitbycategory}/>
                            </div>
                            <div className="charts__left">
                                <div className="charts__left__title">
                                    <div>
                                        <h1>Distribution of Current Situation</h1>
                                        <p>of the products</p>
                                    </div>
                                    <i className="fa fa-address-card"></i>
                                </div>
                                <PieChart_status
                                    status={status}
                                />
                            </div>
                            <div className="charts__right">
                                <div className="charts__right__title">
                                    <div>
                                        <h1>Refunded Amount in a Given Date Range</h1>
                                        <p>by categories</p>
                                    </div>
                                    <i className="fa fa-address-card"></i>
                                </div>
                                <BarChart_refund
                                    refund={refundbycategory}
                                />
                            </div>
                        </div>
                    }
                </Paper>
            </div>
        </main>
    );
}
export default Analyticspage;