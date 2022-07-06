import React from "react";
import Overlay from "../functional/Overlay";
import Aux from "../hoc/Aux";
import MinicartItem from "./minicartItem";
import {Link, useLocation} from "react-router-dom";
import RemovedItem from "./removedItem";

export default function Minicart(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    let products = props.minicart.products,
        removedItemsIDs = props.removedItems,
        dataFilled = products.length ? 'filled' : '',
        totalPrice,
        checkoutLink,
        location = useLocation();

    /**
     * Display last removed cart item
     * @param items
     * @returns {JSX.Element}
     */
    const renderRemovedItems = (items) => {
        if (items.length) {
            return <RemovedItem product={items[items.length - 1]}/>;
        }
    }

    /**
     * Show minicart product
     * @param items
     * @returns {JSX.Element|*}
     */
    const renderDisplayItems = (items) => {
        if (items.length) {
            return items.map((item, index) => {
                return <MinicartItem item={item} key={index}/>;
            });
        } else {
            return <div className='cart-empty'>no products yet</div>;
        }
    }

    /**
     * Calculate product total price
     * @returns {number}
     */
    const calculateSum = () => {
        let sum = 0;
        const arr = products.map((item) => {
            return item.price;
        });
        arr.forEach((item) => sum += item);

        return sum;
    }

    /**
     * Show total block section
     * @param price
     * @returns {JSX.Element}
     */
    const renderTotalBlock = (price) => {
        return <div className="price-total actions">
            <span>Total:</span>
            <strong>${price}</strong>
        </div>
    }

    if (products.length) {
        totalPrice = renderTotalBlock(calculateSum());
        checkoutLink = <Link
            to='/checkout'
            className='btn btn-primary'
        >
            Checkout
        </Link>
    }

    /**
     * Define cart template based on the page view
     * @param path
     * @returns {JSX.Element}
     */
    const showMiniCart = (path) => {
        if (path === '/checkout') {
            return <div className="minicart-checkout" data-filled={dataFilled}>
                <h3>Cart items</h3>
                <div className="items">
                    {renderDisplayItems(products)}
                    {renderRemovedItems(removedItemsIDs)}
                </div>
                {totalPrice}
            </div>
        } else {
            return <Aux>
                <div className="minicart slide-panel" data-filled={dataFilled}>
                    <h2>Minicart</h2>
                    <div className="items">
                        {renderDisplayItems(products)}
                        {renderRemovedItems(removedItemsIDs)}
                    </div>
                    {totalPrice}
                    {checkoutLink}
                </div>
                <Overlay show={props.show} clicked={props.handleMinicartView}/>
            </Aux>
        }
    }

    return showMiniCart(location.pathname);
}
