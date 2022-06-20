import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Spinner from "../functional/Spinner";
import Aux from "../hoc/Aux";

function ProductPage() {

    const params = useParams(),
        navigate = useNavigate(),
        url = `https://dummyjson.com/products/${params.id}`,
        [product, setProduct] = useState({});

    useEffect(() => {
        const getProduct = async () => {
            const result = await axios.get(url);
            setProduct(result.data);
        };
        getProduct();
    }, [])

    let content = <Spinner/>;

    if (product.id) {
        content = <Aux>
            <h1>{product.brand} {product.title}</h1>
            <h3>{product.category}</h3>
            <figure className="figure">
                <img src={product.thumbnail} className="figure-img img-fluid rounded" alt={product.title}/>
                <figcaption className="figure-caption">{product.description}</figcaption>
            </figure>
            <div className="info">
                <table className="table">
                    <tbody>
                    <tr>
                        <td>
                            <h4 className="price-wrap color-green">
                                ${product.price}<br/>
                            </h4>
                        </td>
                        <td>
                            <div className="savings">
                                you save {product.discountPercentage}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="material-symbols-outlined">thumb_up</span></td>
                        <td>{product.rating}</td>
                    </tr>
                    <tr>
                        <td>
                            <span className="material-symbols-outlined">inventory_2</span>
                        </td>
                        <td>{product.stock}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="actions">
                <div className="link-primary" onClick={() => navigate(-1)}>
                    go back
                </div>
                <div className="btn btn-primary" onClick={() => navigate(1)}>
                    buy now
                </div>
            </div>
        </Aux>
    }

    return <div className="product-page">{content}</div>;
}

export default ProductPage;
