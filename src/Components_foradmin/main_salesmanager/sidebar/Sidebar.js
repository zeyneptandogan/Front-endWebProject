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
                    <Link to="/s" className="a">Dashboard</Link>
                </div>
                <h2>MNG</h2>
                <div className="sidebar__link2">
                    <i className="fa fa-user-secret"></i>
                    <Link to="/salesmanager/analytics" className="a">Analytics</Link>
                </div>
                <div className="sidebar__link2">
                    <i className="fa fa-building"></i>
                    <Link to="/salesmanager/product" className="a">Products</Link>
                </div>
                <div className="sidebar__link2">
                    <i className="fa fa-address-card"></i>
                    <Link to="/salesmanager/invoices" className="a">Invoices</Link>
                </div>

                <div className="sidebar__link2">
                    <i className="fa fa-wrench"></i>
                    <Link to="/salesmanager/refund" className="a">Refund Requests</Link>
                </div>

            </div>
        </div>
    );
}
export default Sidebar;