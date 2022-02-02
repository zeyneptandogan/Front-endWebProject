import {useState} from "react";
import "./SalesManager.css";
import Navbar from "../../Components_foradmin/main_salesmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_salesmanager/sidebar/Sidebar";

import Dashboard_sales from "../../Components_foradmin/main_salesmanager/Dashboard_sales";
const SalesManager= ()=>{
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const openSideBar=()=>{
        setSidebarOpen(true);
    }
    const closeSideBar=()=>{
        setSidebarOpen(false);
    }
    return(
        <div className="container_sidebar">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSideBar} />
            <Dashboard_sales/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/>
        </div>
    );
};
export default SalesManager;