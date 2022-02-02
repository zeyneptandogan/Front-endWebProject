import {useState} from "react";

import Navbar from "../../Components_foradmin/main_salesmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_salesmanager/sidebar/Sidebar";
import "../SalesManager/SalesManager.css";
import Searchdata_sales from "../../Components_foradmin/invoices_sales";

function  Invoices_sales(){
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const openSideBar=()=>{
        setSidebarOpen(true);
    }
    const closeSideBar=()=>{
        setSidebarOpen(false);
    }
    return(
        <>
            <div className="container_sidebar">
                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSideBar} />
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/>
                <Searchdata_sales/>

            </div>

        </>
    );
}
export default Invoices_sales;