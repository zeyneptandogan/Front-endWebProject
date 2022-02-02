import "./Navbar.css";
import DnsIcon from '@material-ui/icons/Dns';
import {Link, useHistory} from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserStore from "../../../Login-SignUp/UserStore";

const Navbar_Comment=({sidebarOpen,openSidebar})=>{
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
                <a><Link to="/productmanager/getPendingComment" className="active_link" >Pending</Link></a>
                <a><Link to="/productmanager/getApprovedComment" className="active_link" >Approved</Link></a>
                <a><Link to="/productmanager/getRejectedComment" className="active_link" >Rejected</Link></a>
            </div>
            <div className="navbar__right">
                <a onClick={handleClick}><ExitToAppIcon onClick={handleClick}/>Log Out</a>
            </div>
        </nav>
    );
}
export default Navbar_Comment