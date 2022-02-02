import React, {useState} from "react";
import Sidebar from "../Profile/Components_forprofile/sidebar/Sidebar";
import CreditCard_table from "../Profile/Components_forprofile/Table_creditcard/CreditCard_table";
import "./Profile.css";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";


function  CreditCardEdit(){
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

                <div className="two"><CreditCard_table/></div>
                <div className="three"> <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/></div>

            </div>
            <Footer/>
        </>
    );
}
export default CreditCardEdit;