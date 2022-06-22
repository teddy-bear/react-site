import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";

function Product(props) {

    const {modal, updateMinicart, getMinicart} = React.useContext(GlobalContext);

    const minicartProducts = getMinicart.products;

    let minicartProductsID = [];
    if (minicartProducts) {
        minicartProductsID = minicartProducts.map((props) => {
            return props.id;
        });
    }

    const handleModal = (show, modalContent, modalTitle) => {
        modal(show, modalContent, modalTitle);
    }

    const handleMinicart = (show, products) => {
        updateMinicart(show, products);
    }

    let btn = <div className="btn btn-primary"
                   onClick={() => {
                       handleModal(true, modalContent, props.product.title);
                       handleMinicart(false, props.product)
                   }}>
        Buy now
    </div>

    if (minicartProductsID.includes(props.product.id)) {
        btn = <div className="btn btn-success disabled"
                   onClick={() => {
                       handleModal(true, modalContent, props.product.title);
                       handleMinicart(false, props.product)
                   }}>
            Added to cart
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
                        Price: <strong>{props.product.price}</strong>
                    </p>
                </div>
                <div className="actions">
                    {btn}
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
