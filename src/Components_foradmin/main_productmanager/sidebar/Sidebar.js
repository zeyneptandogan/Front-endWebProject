import "./Sidebar.css";
import React from "react";
import {Link} from "react-router-dom";
const Sidebar=({sidebarOpen,closeSidebar})=>{
    return (
        <div className={sidebarOpen ? "sidebar-responsive2": ""} id="sidebar2">
            <div className="sidebar__title2">
                <div className="sidebar__img2">
                    <Link to="/" >
                    <img
                        className="sidebar__logo2"
                        src="/images/bookstore.PNG"
                        alt="logo"
                    />
                    </Link>
                </div>

                <i
                    className="fa fa-times"
                    id="sidebarIcon"
                    onClick={()=>closeSidebar()}>

                </i>
            </div>

            <div className="sidebar__menu2">
                <div className="sidebar__link2 active_menu_link2">
                    <i className="fa fa-home">
                    </i>
                    <Link to="/p" className="a">Dashboard</Link>
                </div>
                <h2>MNG</h2>
                <div className="sidebar__link2">
                    <i className="fa fa-book"></i>
                    <Link to="/productmanager/allproducts" className="a">Products</Link>
                </div>
                <div className="sidebar__link2">
                    <i className="fa fa-building"></i>
                    <Link to="/productmanager/invoices" className="a">Invoices</Link>
                </div>

                <div className="sidebar__link2">
                    <i className="fa fa-comment"></i>
                    <Link to="/productmanager/getPendingComment" key={"0"} className="a">Comment Requests</Link>
                </div>

            </div>
        </div>
    );
}
export default Sidebar;