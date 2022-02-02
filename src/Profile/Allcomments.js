import React, {useState} from "react";
import "./Profile.css";
import Sidebar from "../Profile/Components_forprofile/sidebar/Sidebar";
import Comment_table from "../Profile/Components_forprofile/Table_comments/Comment_table";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";


function Allcomments(){
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

                <div className="two"><Comment_table/></div>
                <div className="three"> <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/></div>

            </div>
            <Footer/>
        </>
    );
}
export default Allcomments;