import "./Sidebar.css";
import React from "react";
import {Link} from "react-router-dom";



const Sidebar=({sidebarOpen,closeSidebar})=>{
    return (
        <div className={sidebarOpen ? "sidebar-responsive": ""} id="sidebar">
            <div className="sidebar__title">


                <i
                    className="fa fa-times"
                    id="sidebarIcon"
                    onClick={()=>closeSidebar()}>

                </i>
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link">
                    <i className="fa fa-home"></i>
                    <Link to="/pr" className="a">Account Information</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <Link to="/profile/history" className="a">History</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-building"></i>
                    <Link to="/profile/comments" className="a">Comments</Link>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-address-card"></i>
                    <Link to="/profile/addr" className="a">Address</Link>
                </div>

                <div className="sidebar__link">
                    <i className="fa fa-wrench"></i>
                    <Link to="/profile/credi" className="a">Credit Card</Link>
                </div>

            </div>
        </div>
    );
}
export default Sidebar;