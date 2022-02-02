import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import UserStore from "../Login-SignUp/UserStore";

function Subtotal() {
    const history = useHistory();

    function handleClick() {
        if (UserStore.isLoggedIn === true){
            history.push("/a");
        }
        else{
            history.push("/login");
        }
    }



    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({UserStore.cartList.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={UserStore.cartTotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button disabled={UserStore.cartList.length === 0} onClick={handleClick}>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;