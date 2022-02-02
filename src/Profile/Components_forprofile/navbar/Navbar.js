import "./Navbar.css";
import PersonIcon from '@material-ui/icons/Person';
import DnsIcon from '@material-ui/icons/Dns';
import {Link} from "react-router-dom";
const Navbar=({sidebarOpen,openSidebar})=>{
    return(
        <nav className="navbar_admin">
            <div className="nav_icon" onClick={()=>openSidebar()}>
                {/*<i className="fa fa-bars"></i>*/}
                <DnsIcon/>
            </div>
            <div className="navbar__left">
                <a><Link to="/pr" className="active_link" >Admin</Link></a>
            </div>
            <div className="navbar__right">
                <a href="#">
                    <PersonIcon/>
                    Log out
                </a>
            </div>
        </nav>
    );
}
export default Navbar;