import React, {useState} from "react";
import "./Profile.css";
import Sidebar from "../Profile/Components_forprofile/sidebar/Sidebar";
import Dashboard_profile from "../Profile/Components_forprofile/Dashboard_profile";
import Header from "../Header-Footer/Header";
import Footer from "../Header-Footer/Footer";

const Profile= ()=>{
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

                <div className="two"><Dashboard_profile/></div>
                <div className="three"> <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSideBar}/></div>

            </div>
            <Footer/>
        </>
    );
}
export default Profile;