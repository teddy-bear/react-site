import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";

function Product(props) {

    const {modal, updateMinicart, getMinicart, handleRemovedItems,  getRemovedItems} = React.useContext(GlobalContext);

    const minicartProducts = getMinicart.products;
    const removedItems = getRemovedItems;

    let minicartProductsID = [],
        removedItemsID = [];

    if (minicartProducts) {
        minicartProductsID = minicartProducts.map((props) => {
            return props.id;
        });
    }

    if (removedItems) {
        removedItemsID = removedItems.map((props) => {
            return props.id;
        });
    }

    /**
     * Modal call
     * @param show
     * @param modalContent
     * @param modalTitle
     */
    const handleModal = (show, modalContent, modalTitle) => {
        modal(show, modalContent, modalTitle);
    }

    /**
     * Minicart update
     * @param show
     * @param product
     */
    const handleMinicart = (show, product) => {
        updateMinicart(show, product);
        if (removedItemsID && removedItemsID.includes(props.product.id)) {
            handleRemovedItems(product, true);
        }
    }

    /**
     * Display buy button
     * @returns {JSX.Element}
     */
    const buttonText = () => {
        let btnText = 'Buy now',
            btnClass = 'btn btn-primary';

        if (minicartProductsID.includes(props.product.id)) {
            btnText = 'Added to cart';
            btnClass = 'btn btn-success disabled';
        }

        if (removedItemsID.includes(props.product.id)) {
            btnText = 'Restore';
            btnClass = 'btn btn-info';
        }

        return <div className={btnClass}
                    onClick={() => {
                        handleModal(true, modalContent, props.product.title);
                        handleMinicart(false, props.product)
                    }}>
            {btnText}
        </div>
    }

    let modalContent = <div className="inner">
        <p>Product was added to the cart.</p>
        <div className="actions">
                    <span
                        onClick={() => handleModal()}
                        className='link-primary'>
                        Continue shopping
                    </span>
            <Link
                to='/checkout'
                className='btn btn-primary'
            >
                Checkout
            </Link>
        </div>
    </div>;

    return (
        <div className="card">
            <img src={props.product.thumbnail} className="card-img-top" alt={props.product.title}/>
            <div className="card-body">
                <h5 className="card-title">{props.product.title}</h5>
                <div className="card-text">
                    <p>{props.product.description}</p>
                    <p className="price">
                        Price: <strong>${props.product.price}</strong>
                    </p>
                </div>
                <div className="actions">
                    {buttonText()}
                    <Link
                        to={`/products/product/${props.product.id}`}
                        className='btn btn-secondary'
                    >
                        quick view
                    </Link>
                </div>

            </div>
        </div>
    );

}

export default Product;
