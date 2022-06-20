import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from "./Product";
import ProductSwitcher from "./productSwitcher";
import CategoryFilter from "./CategoryFilter";

const Products = () => {

    const PRODUCT_API = 'https://dummyjson.com/products?limit=12';

    const [data, setData] = useState({
        products: [],
        isFetching: false
    });

    const [viewMode, setViewMode] = useState('grid');
    const [filterCategory, setFilterCategory] = useState({
        results: '',
        currentCategory: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({
                    products: data.products,
                    isFetching: true
                });
                const response = await axios.get(PRODUCT_API);
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

    /**
     * Filter products by category
     * @param category
     */
    const filterByCategory = (category) => {
        let arr = data.products.products;
        let results = [];

        if (arr) {
            if (category) {
                results = arr.filter(obj => {
                    return obj.category === category;
                });
            } else {
                results = arr;
            }
        }

        setFilterCategory({
            results: results,
            currentCategory: category
        });
    }

    // Source to load the products array: original query or category filter
    let products = filterCategory.currentCategory !== '' ? filterCategory.results : data.products.products;

    let productsCount = products ? products.length : '';

    return (
        <div className="product-list-wrap">

            <CategoryFilter
                products={data.products.products}
                handleClick={(category) => filterByCategory(category)}
                currentCategory={filterCategory.currentCategory}
            />

            <div className="results">
                Total: <strong>{productsCount}</strong> products found
            </div>

            {/* todo: move layout toggle to a separate widget */}
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
                    products={products}
                    isFetching={data.isFetching}
                />
            </div>

        </div>
    );

}

export default Products;
