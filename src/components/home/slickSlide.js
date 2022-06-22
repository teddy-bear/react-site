import React from "react";
import {Link} from "react-router-dom";

function SlickSlide(props) {
    return (
        <div className="item">
            <img src={props.product.thumbnail} className="card-img-top" alt={props.product.title}/>
            <div className="title">{props.product.title}</div>
            <Link
                to={`/products/product/${props.product.id}`}
                className='btn btn-primary'
            >
                View product
            </Link>
        </div>
    );
}

export default SlickSlide;
