import {useState} from "react";
import "./SalesManager.css";
import Sidebar from "../../Components_foradmin/main_salesmanager/sidebar/Sidebar";
import Analyticspage from "../../Components_foradmin/main_salesmanager/Table_Analytics/Analyticspage";
import Navbar from "../../Components_foradmin/main_salesmanager/navbar/Navbar";

function Analytics(){
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
            <Analyticspage/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/>
        </div>
    );
}
export default Analytics;