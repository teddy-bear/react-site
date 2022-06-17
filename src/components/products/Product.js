import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ModalContext from "../modal/modalContext";
import Spinner from "../functional/Spinner";

function Product(props) {

    let products = props.products;

    let content = <Spinner/>;

    const modalContext = useContext(ModalContext);

    const handleModal = (show, modalContent, modalTitle) => {
        modalContext(show, modalContent, modalTitle);
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
                        <p className="card-text">{item.description}</p>
                        <div className="actions">
                            <div className="btn btn-primary"
                                 onClick={() => handleModal(true, modalContent, item.title)}>
                                Buy now
                            </div>
                            <Link
                                to={`/products/product_${item.id}`}
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
