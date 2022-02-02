import {useState} from "react";

import Navbar from "../../Components_foradmin/main_salesmanager/navbar/Navbar";
import Sidebar from "../../Components_foradmin/main_salesmanager/sidebar/Sidebar";
import Product_edittable from "../../Components_foradmin/main_salesmanager/Table_product_edit/Product_edittable";
import "../SalesManager/SalesManager.css";


function  Productedit(){
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
                <Product_edittable/>

            </div>

        </>
    );
}
export default Productedit;