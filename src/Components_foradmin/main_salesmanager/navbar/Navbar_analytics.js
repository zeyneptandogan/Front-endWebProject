import "./Navbar.css";
import PersonIcon from '@material-ui/icons/Person';
import DnsIcon from '@material-ui/icons/Dns';

const Navbar=({sidebarOpen,openSidebar})=>{
    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={()=>openSidebar()}>
                {/*<i className="fa fa-bars"></i>*/}
                <DnsIcon/>
            </div>
            <div className="navbar__left">
                <a className="active_link">Based on all products</a>
                <a className="active_link" href="#">Based on publishers</a>
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