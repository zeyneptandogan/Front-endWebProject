import {useState} from "react";

import Navbar from "../../Components_foradmin/main_salesmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_salesmanager/sidebar/Sidebar";
import "../SalesManager/SalesManager.css";
import Refund_table from "../../Components_foradmin/main_salesmanager/Table_refund/Refund_table";


function  Allrefunds(){
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
                <Refund_table/>

            </div>

        </>
    );
}
export default Allrefunds;