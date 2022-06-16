import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from "./Product";
import ProductSwitcher from "./productSwitcher";

const Products = () => {

    const [data, setData] = useState({
        products: [],
        isFetching: false
    });

    const [viewMode, setViewMode] = useState('list');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({
                    products: data.products,
                    isFetching: true
                });
                const response = await axios.get('https://dummyjson.com/products?limit=10');
                setData({
                        products: response.data,
                        isFetching: false
                    }
                );
            } catch (e) {
                console.log(e);
                setData({
                        products: data.products,
                        isFetching: false
                    }
                );
            }
        };
        fetchData();
    }, []); // [] needed to run only once


    /**
     * Product layout view mode handler
     * @param currentView
     * @param event
     */
    const viewModeToggle = (currentView, event) => {
        if (currentView !== viewMode) {
            setViewMode(currentView);
        }
    }

    return (
        <div className="product-list-wrap">
            <div className="products-mode">

                <div className="show-mode">
                    Current mode: <strong>{viewMode}</strong>
                </div>

                <div className="mode-toggle">
                    <ProductSwitcher view='list' currentView={viewMode}
                                     handleCLick={(view, event) => viewModeToggle(view, event)}/>
                    <ProductSwitcher view='grid' currentView={viewMode}
                                     handleCLick={(view, event) => viewModeToggle(view, event)}/>
                </div>

            </div>
            <div className="product-list" data-view={viewMode}>
                <Product
                    products={data.products.products}
                    isFetching={data.isFetching}
                />
            </div>
        </div>
    );

}

export default Products;
