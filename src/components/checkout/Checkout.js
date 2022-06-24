import React from "react";
import CheckoutForm from "./checkoutForm";
import TabsWidget from "../tabs/tabsWidget";

function Checkout(props) {

    let tabsConfig = {
        products: {
            title: 'Products',
            content: props.children
        },
        customer:
            {
                title: 'Customer details',
                content: <CheckoutForm/>
            }
    }

    return (
        <div className="checkout-wrap">
            <h1>Checkout</h1>

            <TabsWidget tabs={tabsConfig}/>

            {/*<div className="row">
                <div className="col-md-6">
                    {props.children}
                </div>
                <div className="col-md-6">
                    <CheckoutForm />
                </div>
            </div>*/}
        </div>
    )
}

export default Checkout;
