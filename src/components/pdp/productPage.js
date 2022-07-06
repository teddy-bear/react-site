import React, {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import Spinner from "../functional/Spinner";
import Aux from "../hoc/Aux";
import GlobalContext from "../context/globalContext";
import ImageGallery from "react-image-gallery";

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
    }, []);

    const {modal, updateMinicart, getMinicart} = React.useContext(GlobalContext);

    const minicartProducts = getMinicart.products;

    /**
     * Set modal
     * @param show
     * @param modalContent
     * @param modalTitle
     */
    const handleModal = (show, modalContent, modalTitle) => {
        modal(show, modalContent, modalTitle);
    }

    /**
     * Update Minicart
     * @param show
     * @param products
     */
    const handleMinicart = (show, products) => {
        updateMinicart(show, products);
    }

    let minicartProductsID = [];
    if (minicartProducts.length) {
        minicartProductsID = minicartProducts.map((item) => item.id);
    }

    let content = <Spinner/>;

    if (product.id) {

        let slideImages = product.images.map((item) => {
            return {original: item, thumbnail: item};
        })

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

        let btn = <div className="btn btn-primary"
                       onClick={() => {
                           handleModal(true, modalContent, product.title);
                           handleMinicart(false, product)
                       }}>
            Buy now
        </div>;

        if (minicartProductsID.includes(product.id)) {
            btn = <div className="btn btn-success disabled">
                Already in cart
            </div>
        }

        content = <Aux>
            <h1>{product.brand} {product.title}</h1>
            <h3>{product.category}</h3>

            <ImageGallery
                items={slideImages}
                showThumbnails={true}
                loading='lazy'
                lazyLoad={true}
            />

            <div className="figure-caption">{product.description}</div>

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
                {btn}
            </div>
        </Aux>
    }

    return <div className="product-page">{content}</div>;
}

export default ProductPage;
