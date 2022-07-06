import React from "react";
import {Link} from "react-router-dom";
import GlobalContext from "../context/globalContext";

function SlickSlide(props) {

    const {getMinicart} = React.useContext(GlobalContext);

    const minicartProducts = getMinicart.products;

    let minicartProductsID = [];
    if (minicartProducts) {
        minicartProductsID = minicartProducts.map((props) => {
            return props.id;
        });
    }

    let btnText = 'View product',
        btnClass = 'btn btn-primary';

    if (minicartProductsID.includes(props.product.id)) {
        btnText = 'Already in cart';
        btnClass = 'btn btn-success';
    }

    return (
        <div className="item">
            <img src={props.product.thumbnail} className="card-img-top" alt={props.product.title}/>
            <div className="title">{props.product.title}</div>
            <div className="price">${props.product.price}</div>
            <Link
                to={`/products/product/${props.product.id}`}
                className={btnClass}
            >
                {btnText}
            </Link>
        </div>
    );
}

export default SlickSlide;
