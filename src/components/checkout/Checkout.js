import React from "react";
import CheckoutForm from "./checkoutForm";

function Checkout(props) {

    return (
        <div className="checkout-wrap">
            <h1>Checkout</h1>
            <div className="row">
                <div className="col-md-6">
                    {props.children}
                </div>
                <div className="col-md-6">
                    <CheckoutForm />
                </div>
            </div>
        </div>
    )
}

export default Checkout;
