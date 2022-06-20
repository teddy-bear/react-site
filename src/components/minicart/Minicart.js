import React from "react";
import Overlay from "../functional/Overlay";
import Aux from "../hoc/Aux";
import MinicartItem from "./minicartItem";

function Minicart(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    let products = props.minicart.products,
        cartItems = 'no products yet',
        totalPrice,
        dataFilled = '',
        sum = 0;


    if (products.length) {
        dataFilled = 'filled';

        cartItems = products.map((item, index) => {
            return <MinicartItem item={item} key={index}/>;
        });

        const arr = products.map((item) => {
            return item.price;
        });
        arr.forEach((item) => sum += item);

        totalPrice = <div className="price-total actions">
            <span>Total:</span>
            <strong>${sum}</strong>
        </div>
    }

    return (
        <Aux>
            <div className="minicart slide-panel" data-filled={dataFilled}>
                <h2>Minicart</h2>
                <div className="items">
                    {cartItems}
                </div>
                {totalPrice}
            </div>
            <Overlay show={props.show} clicked={props.handleMinicartView}/>
        </Aux>
    )
}

export default Minicart;
