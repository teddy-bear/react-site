import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";
import Spinner from "../functional/Spinner";

function Product(props) {

    let products = props.products;

    let content = <Spinner/>;

    const {modal, minicart} = React.useContext(GlobalContext);
    /*const [stateValue, setStateValue] = modal;
    const [stateValue2, setStateValue2] = value2;*/

    const handleModal = (show, modalContent, modalTitle) => {
        modal(show, modalContent, modalTitle);
    }

    const handleMinicart = (show, products) => {
        minicart(show, products);
    }

    if (products) {
        content = products.map((item, index) => {
            let modalContent = <div className="inner">
                <p>Product was added to the cart.</p>
                <div className="actions">
                    <span
                        onClick={() => handleModal()}
                        className='link-primary'>
                        Continue shopping
                    </span>
                    <button className="btn btn-primary">Checkout</button>
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
                            <div className="btn btn-primary"
                                 onClick={() => {
                                     handleModal(true, modalContent, item.title);
                                     handleMinicart(false, item)
                                 }}>
                                Buy now
                            </div>
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
