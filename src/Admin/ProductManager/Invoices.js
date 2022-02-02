import {useState} from "react";

import Navbar from "../../Components_foradmin/main_productmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_productmanager/sidebar/Sidebar";
import "../SalesManager/SalesManager.css";
import Searchdata from "../../Components_foradmin/invoices_product";

function  Invoices(){
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
                <Searchdata/>

            </div>

        </>
    );
}
export default Invoices;