import {useState} from "react";
import Navbar from "../../Components_foradmin/main_productmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_productmanager/sidebar/Sidebar";
import Dashboard_product from "../../Components_foradmin/main_productmanager/Dashboard_product";
import "../SalesManager/SalesManager.css";

const ProductManager= ()=>{
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
            <Dashboard_product/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/>
        </div>
    );
};
export default ProductManager;