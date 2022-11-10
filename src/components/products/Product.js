import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";
import WishListIcon from "../wishlist/wishListIcon";

function Product(props) {

    const {
        modal,
        updateMinicart,
        getMinicart,
        handleRemovedItems,
        getRemovedItems,
        getwishListItems,
    } = React.useContext(GlobalContext);

    const product = props.product,
        minicartProducts = getMinicart.products,
        removedItems = getRemovedItems;

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
        if (removedItemsID && removedItemsID.includes(product.id)) {
            handleRemovedItems(product, true);
        }
    }

    /**
     * Display buy button
     * @returns {JSX.Element}
     */
    const renderButton = () => {
        let btnText = 'Buy now',
            btnClass = 'btn btn-primary';

        if (minicartProductsID.includes(product.id)) {
            btnText = 'Added to cart';
            btnClass = 'btn btn-success disabled';
        }

        if (removedItemsID.includes(product.id)) {
            btnText = 'Restore';
            btnClass = 'btn btn-info';
        }

        return <div className={btnClass}
                    onClick={() => {
                        handleModal(true, modalContent, product.title);
                        handleMinicart(false, product)
                    }}>
            {btnText}
        </div>
    }

    /**
     * Check if product has been added to the wish list
     * @returns {boolean|*}
     */
    const isAddedToWishList = () => {
        let wishListItems = getwishListItems.products;

        if (wishListItems && wishListItems.length) {
            let listItems = wishListItems.map((item) => item.id);
            return listItems.includes(product.id);
        }
        return false;
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
            <img src={product.thumbnail} className="card-img-top" alt={product.title}/>
            <WishListIcon product={product} isAdded={isAddedToWishList()}/>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="card-text">
                    <p>{product.description}</p>
                    <p className="price">
                        Price: <strong>${product.price}</strong>
                    </p>
                </div>
                <div className="actions">
                    {renderButton()}
                    <Link
                        to={`/products/product/${product.id}`}
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
