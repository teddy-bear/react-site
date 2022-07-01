import React from "react";
import CheckoutForm from "./checkoutForm";
import TabsWidget from "../tabs/tabsWidget";
import ErrorBoundary from "../functional/errorHandler";

export default function Checkout(props) {

    let tabsConfig = {
        products: {
            title: 'Products',
            content: props.children
        },
        customer: {
            title: 'Customer details',
            content: <ErrorBoundary><CheckoutForm/></ErrorBoundary>
        }
    }

    return (
        <div className="checkout-wrap">
            <h1>Checkout</h1>
            <TabsWidget tabs={tabsConfig}/>
        </div>
    )
}
