import React, {useState} from "react";
import Sidebar from "../Profile/Components_forprofile/sidebar/Sidebar";
import "./Profile.css";
import Order_table from "../Profile/Components_forprofile/Table_history/Order_table";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";


function Allorders(){
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const openSideBar=()=>{
        setSidebarOpen(true);
    }
    const closeSideBar=()=>{
        setSidebarOpen(false);
    }
    return(
        <>
            <Header/>
            <div className="wrapper">

                <div className="two"><Order_table/></div>
                <div className="three"> <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/></div>

            </div>
            <Footer/>
        </>
    );
}
export default Allorders;