import React, {useEffect, useState} from 'react';
import API from "../../api";
import Product from "./Product";
import ProductSwitcher from "./productSwitcher";
import CategoryFilter from "./CategoryFilter";
import Spinner from "../functional/Spinner";
import SortingWidget from "./sortingWidget";

const Products = () => {

    const [data, setData] = useState({
        products: [],
        isFetching: false
    });

    const [viewMode, setViewMode] = useState('grid');
    const [productsOrder, setProductsOrder] = useState(false);
    const [filterCategory, setFilterCategory] = useState({
        results: '',
        currentCategory: ''
    });

    const [productCategories, setProductCategories] = useState(null);

    /**
     * Get products data on page render
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({
                    products: data.products,
                    isFetching: true
                });
                const response = await API.get('?limit=12');
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

    /**
     * Set products order
     * @param e
     */
    const setOrder = (e) => {

        setProductsOrder(e.target.value);

        // todo: add custom hook here
    }

    /**
     * Watch for sort order change
     * todo: try as a custom hook
     */
    useEffect(() => {
        if (productsOrder && data.products.products.length) {
            let sortedProducts = [...data.products.products];

            if (productsOrder.includes('price')) {
                sortedProducts = sortByPrice(productsOrder);
            } else if (productsOrder.includes('name')) {
                sortedProducts = sortByName(productsOrder);
            } else if (productsOrder === 'default') {
                sortedProducts = products.sort((a, b) => a.id - b.id)
            } else if (productsOrder === 'rating') {
                sortedProducts = products.sort((a, b) => b.rating - a.rating)
            }

            setData({
                products: {
                    products: sortedProducts
                },
                isFetching: false // todo: check if this prop is needed
            })
        }

    }, [productsOrder]);

    /**
     * Sort products by price
     * @param order
     * @returns {*}
     */
    const sortByPrice = (order) => {
        let sortedProducts = products.sort((a, b) => a.price - b.price);

        if (order === 'priceDESC') {
            sortedProducts = products.sort((a, b) => b.price - a.price);
        }

        return sortedProducts;
    }

    /**
     * Sort products by price
     * @param order
     * @returns {*}
     */
    const sortByName = (order) => {
        let sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));

        if (order === 'nameDESC') {
            sortedProducts = products.sort((a, b) => b.title.localeCompare(a.title));
        }

        return sortedProducts;
    }

    /**
     * Get categories list
     * @param products
     */
    const getCategoriesList = (products) => {
        let categories = new Set();

        products.forEach((element) => {
            categories.add(element.category);
        });

        let categoriesArray = Array.from(categories);

        setProductCategories(categoriesArray);
    }

    // Source to load the products array: original query or category filter
    let products = filterCategory.currentCategory !== '' ? filterCategory.results : data.products.products;

    let productItems = <Spinner/>;

    let productsCount;

    if (data.products.products && !productCategories) {
        getCategoriesList(data.products.products);
    }

    if (products) {
        productsCount = products.length;

        productItems = products.map((item, index) => {
            return <Product
                key={index}
                product={{...item}}
            />
        });
    }

    return (
        <div className="product-list-wrap">

            {/*todo: avoid render on order change, pass immutable categories list */}
            <CategoryFilter
                /*products={data.products.products}*/
                categories={productCategories}
                handleClick={(category) => filterByCategory(category)}
                currentCategory={filterCategory.currentCategory}
            />

            <div className="row-sorting">
                <div className="results">
                    Total: <strong>{productsCount}</strong> products found
                </div>
                <SortingWidget handleChange={setOrder}/>
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
                {productItems}
            </div>

        </div>
    );

}

export default Products;
