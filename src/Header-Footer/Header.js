import React, { useState} from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PersonIcon from '@material-ui/icons/Person';
import {Link, useHistory} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import UserStore from "../Login-SignUp/UserStore";

function Header() {
    const history = useHistory();

    const [data_ch,setData_ch]=useState({
        search_input:"",
    })
    function handle(e){
        const newdata_ch={...data_ch}
        newdata_ch[e.target.id]=e.target.value
        setData_ch(newdata_ch)
        //console.log(newdata_ch)
    }
    function handleClick(){

        history.push("/search/"+ data_ch.search_input )
    }

    function handleClick3(e){
        if(e.keyCode === 13){
            history.push("/search/"+ data_ch.search_input )
        }
    }
    function handleClick2(){

        history.push("/pr");
    }
    function handleClick4(){

        UserStore.loading = true;
        UserStore.isLoggedIn =false;
        UserStore.email='';
        UserStore.userId= '-2';
        UserStore.cartList=[];
        UserStore.cartTotal=0;
        history.push("/");
    }


    if (UserStore.isLoggedIn === false) {
        return (

            <header>
                <div className="header-1">
                    <Link to="/">
                        <img
                            className="header__logo"
                            src="/images/bookstore.PNG"
                        />
                    </Link>

                    <div className="header__search">
                        <input  onKeyDown={handleClick3} onChange={(e)=>handle(e)} id="search_input" className="header__searchInput" type="text" placeholder="Search products" name="search_input"/>
                        <SearchIcon onClick={handleClick} className="header__searchIcon"/>
                    </div>

                    <div className="header__nav">
                        <Link to="/login" className="header__link">
                            <div className="header__option">
                                <span className="header__optionLineOne">Hello Guest</span>
                                <span className="header__optionLineTwo">Sign In</span>
                            </div>
                        </Link>
                        <div className="header__optionBasket">
                            <Link to="/cart" className="header__link" >
                                <ShoppingBasketIcon/>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="header-2">
                    <nav className="navbar">
                        <ul>

                            <li>
                                <Link to="/category/0" key={"0"}
                                >NOVEL</Link>
                            </li>
                            <li>
                                <Link to="/category/1" key={"1"}
                                >POETRY</Link>
                            </li>
                            <li>
                                <Link to="/category/2" key={"2"}
                                >STORY</Link>
                            </li>
                            <li>
                                <Link to="/category/3" key={"3"}
                                >BIOGRAPHY</Link>
                            </li>
                            <li>
                                <Link to="/category/4" key={"4"}
                                >COOKBOOKS</Link>
                            </li>
                        </ul>

                    </nav>

                </div>
            </header>
        );

    }
    else if (UserStore.isLoggedIn !== false) {

        return (

            <header>
                <div className="header-1">
                    <Link to="/">
                        <img
                            className="header__logo"
                            src="/images/bookstore.PNG"
                        />
                    </Link>

                    <div className="header__search">
                        <input onKeyDown={handleClick3} onChange={(e)=>handle(e)} id="search_input" className="header__searchInput" type="text" placeholder="Search products" name="search_input"/>
                        <SearchIcon onClick={handleClick} className="header__searchIcon"/>
                    </div>

                    <div className="header__nav">

                        <div className="header__optionBasket">
                            <PersonIcon onClick={handleClick2} className="svg__icon"/>
                            <Link to="/cart" className="header__link" >
                                <ShoppingBasketIcon/>
                            </Link>
                            <ExitToAppIcon onClick={handleClick4} className="svg__icon" />
                        </div>

                    </div>
                </div>
                <div className="header-2">
                    <nav className="navbar">
                        <ul>

                            <li>
                                <Link to="/category/0" key={"0"}
                                >NOVEL</Link>
                            </li>
                            <li>
                                <Link to="/category/1" key={"1"}
                                >POETRY</Link>
                            </li>
                            <li>
                                <Link to="/category/2" key={"2"}
                                >STORY</Link>
                            </li>
                            <li>
                                <Link to="/category/3" key={"3"}
                                >BIOGRAPHY</Link>
                            </li>
                            <li>
                                <Link to="/category/4" key={"4"}
                                >COOKBOOKS</Link>
                            </li>
                        </ul>

                    </nav>

                </div>
            </header>
        );

    }
}

export default Header;