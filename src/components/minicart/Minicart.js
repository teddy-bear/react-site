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

    if (cartItems) {
        cartItems = products.map((item, index) => {
            return <MinicartItem item={item} key={index}/>;
        });
    }


    return (
        <Aux>
            <div className="minicart slide-panel">
                <h2>Minicart</h2>
                {cartItems}
                <div className="price-total">
                    Total: <strong>$999</strong>
                </div>
            </div>
            <Overlay show={props.show} clicked={props.handleMinicartView}/>
        </Aux>
    )
}

export default Minicart;
