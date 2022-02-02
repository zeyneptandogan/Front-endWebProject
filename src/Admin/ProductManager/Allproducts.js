import {useState} from "react";

import Navbar from "../../Components_foradmin/main_productmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_productmanager/sidebar/Sidebar";
import Product_table from "../../Components_foradmin/main_productmanager/Table_product/Product_table";
import "../SalesManager/SalesManager.css";


function  Allproducts(){
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
            <Product_table/>

        </div>

        </>
    );
}
export default Allproducts;