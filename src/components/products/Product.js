import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";
import Spinner from "../functional/Spinner";

function Product(props) {

    let products = props.products;

    let content = <Spinner/>;

    const {modal, updateMinicart, getMinicart} = React.useContext(GlobalContext);
    /*const [stateValue, setStateValue] = modal;
    const [stateValue2, setStateValue2] = value2;*/

    const minicartProducts = getMinicart.products;

    let minicartProductsID = [];
    if (minicartProducts) {
        minicartProductsID = minicartProducts.map((item) => {
            return item.id;
        });
    }

    const handleModal = (show, modalContent, modalTitle) => {
        modal(show, modalContent, modalTitle);
    }

    const handleMinicart = (show, products) => {
        updateMinicart(show, products);
    }

    if (products) {
        content = products.map((item, index) => {

            // todo: reduce repeated code
            let btn = <div className="btn btn-primary"
                           onClick={() => {
                               handleModal(true, modalContent, item.title);
                               handleMinicart(false, item)
                           }}>
                Buy now
            </div>
            if (minicartProductsID.includes(item.id)) {
                btn = <div className="btn btn-success disabled"
                           onClick={() => {
                               handleModal(true, modalContent, item.title);
                               handleMinicart(false, item)
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
                <div className="card" key={index}>
                    <img src={item.thumbnail} className="card-img-top" alt={item.title}/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <div className="card-text">
                            <p>{item.description}</p>
                            <p className="price">
                                Price: <strong>{item.price}</strong>
                            </p>
                        </div>
                        <div className="actions">
                            {btn}
                            <Link
                                to={`/products/product/${item.id}`}
                                className='btn btn-secondary'
                            >
                                quick view
                            </Link>
                        </div>

                    </div>
                </div>
            );
        })
    }

    return content;

}

export default Product;
