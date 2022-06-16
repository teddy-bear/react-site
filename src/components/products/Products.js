import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from "./Product";
import ProductSwitcher from "./productSwitcher";
import CategoryFilterButton from "./CategoryFilterButton";
import CategoryFilter from "./CategoryFilter";

const Products = () => {

    const [data, setData] = useState({
        products: [],
        isFetching: false
    });

    const [viewMode, setViewMode] = useState('list');
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
    let products = filterCategory.currentCategory.length > 0 ? filterCategory.results : data.products.products;

    return (
        <div className="product-list-wrap">

            <div className="category-filter">
                <div className="btn-group">
                    <CategoryFilterButton
                        category=''
                        currentCategory={filterCategory.currentCategory}
                        handleClick={(category) => filterByCategory(category)}
                    >
                        All
                    </CategoryFilterButton>
                    <CategoryFilterButton
                        category='smartphones'
                        currentCategory={filterCategory.currentCategory}
                        handleClick={(category) => filterByCategory(category)}
                    >
                        Smartphones
                    </CategoryFilterButton>
                    <CategoryFilterButton
                        category='laptops'
                        currentCategory={filterCategory.currentCategory}
                        handleClick={(category) => filterByCategory(category)}
                    >
                        Laptops
                    </CategoryFilterButton>
                </div>
            </div>

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
