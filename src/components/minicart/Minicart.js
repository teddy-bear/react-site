import React from "react";
import Overlay from "../functional/Overlay";
import Aux from "../hoc/Aux";
import MinicartItem from "./minicartItem";

function Minicart(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    let products = props.minicart.products;
    let cartItems = 'no products yet';

    if (products) {
        cartItems = products.map((item, index) => {
            return <MinicartItem item={item} key={index}/>;
        });
    }

    let dataFilled = products.length ? 'filled' : '';

    return (
        <Aux>
            <div className="minicart slide-panel" data-filled={dataFilled}>
                <h2>Minicart</h2>
                <div className="items">
                    {cartItems}
                </div>
                <div className="price-total actions">
                    <span>Total:</span>
                    <h5>$999</h5>
                </div>
            </div>
            <Overlay show={props.show} clicked={props.handleMinicartView}/>
        </Aux>
    )
}

export default Minicart;
