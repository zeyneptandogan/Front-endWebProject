import {useState} from "react";


import Sidebar from "../../Components_foradmin/main_productmanager/sidebar/Sidebar";
import "../SalesManager/SalesManager.css";
import Comment_table from "../../Components_foradmin/main_productmanager/Table_comment/Comment_table";
import Navbar_Comment from "../../Components_foradmin/main_productmanager/navbar/Navbar_analytics";

function  CommentPage(){
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
                <Navbar_Comment sidebarOpen={sidebarOpen} openSidebar={openSideBar} />
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/>
                <Comment_table/>

            </div>

        </>
    );
}
export default CommentPage;