import "./Navbar.css";
import DnsIcon from '@material-ui/icons/Dns';
import {Link, useHistory} from "react-router-dom";
import UserStore from "../../../Login-SignUp/UserStore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const Navbar=({sidebarOpen,openSidebar})=>{
    const history = useHistory();
    function handleClick(){

        UserStore.loading = true;
        UserStore.isLoggedIn =false;
        UserStore.email='';
        UserStore.userId= '-2';
        UserStore.cartList=[];
        UserStore.cartTotal=0;
        history.push("/");
    }
    return(
        <nav className="navbar_admin">
            <div className="nav_icon" onClick={()=>openSidebar()}>
                {/*<i className="fa fa-bars"></i>*/}
                <DnsIcon/>
            </div>
            <div className="navbar__left">
                <a><Link to="/s" className="active_link" >Admin</Link></a>
                <a><Link to="/" className="active_link" >Home Page</Link></a>
            </div>
            <div className="navbar__right">
                <a onClick={handleClick}><ExitToAppIcon onClick={handleClick}/>Log Out</a>
            </div>
        </nav>
    );
}
export default Navbar;