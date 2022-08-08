import React, {useEffect, useState} from 'react';
import API from "../../api";
import Product from "./Product";
import ProductSwitcher from "./productSwitcher";
import CategoryFilter from "./CategoryFilter";
import Spinner from "../functional/Spinner";
import SortingWidget from "./sortingWidget";

const Products = () => {

    interface PropsType {
        products: Array<any>,
        isFetching: boolean,
    }

    const [data, setData] = useState<PropsType>({
        products: [],
        isFetching: false
    });

    const [viewMode, setViewMode] = useState('grid');
    const [productsOrder, setProductsOrder] = useState('default');
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
     */
    const viewModeToggle = (currentView) => {
        if (currentView !== viewMode) {
            setViewMode(currentView);
        }
    }

    /**
     * Filter products by category
     * @param category
     */
    const filterByCategory = (category) => {
        // @ts-ignore
        let arr = data.products.products,
            results = [];

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
            // @ts-ignore
            results: results,
            currentCategory: category
        });
    }

    /**
     * Set products order variable
     * @param e
     */
    const setOrder = (e) => {
        setProductsOrder(e.target.value);
    }

    /**
     * Apply products sorting
     * @param products
     * @returns {*}
     */
    const doSorting = (products) => {
        let sortedProducts;

        if (productsOrder.includes('price')) {
            sortedProducts = sortByPrice(productsOrder, products);
        } else if (productsOrder.includes('name')) {
            sortedProducts = sortByName(productsOrder, products);
        } else if (productsOrder === 'default') {
            sortedProducts = products.sort((a, b) => a.id - b.id)
        } else if (productsOrder === 'rating') {
            sortedProducts = products.sort((a, b) => b.rating - a.rating)
        }

        return sortedProducts;
    }

    /**
     * Sort products by price
     * @param order
     * @param products
     * @returns {*}
     */
    const sortByPrice = (order, products) => {

        let sortedProducts = products.sort((a, b) => a.price - b.price);

        if (order === 'priceDESC') {
            sortedProducts = products.sort((a, b) => b.price - a.price);
        }

        return sortedProducts;
    }

    /**
     * Sort products by price
     * @param order
     * @param products
     * @returns {*}
     */
    const sortByName = (order, products) => {
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

        setProductCategories(Array.from(categories));
    }

    // Source to load the products array: original query or category filter
    // @ts-ignore
    let products = filterCategory.currentCategory !== '' ? filterCategory.results : data.products.products;
    let productItems = <Spinner/>;

    let productsCount;

    if (products) {
        productsCount = products.length;

        // need to run only once to populate categories widget, think on refactor
        if (!productCategories) {
            // @ts-ignore
            getCategoriesList(data.products.products);
        }

        let sortedItems = doSorting(products);

        productItems = sortedItems.map((item) => {
            return <Product
                key={item.id}
                product={{...item}}
            />
        });
    }

    return (
        <div className="product-list-wrap">

            <CategoryFilter
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
                                     handleCLick={(view) => viewModeToggle(view)}/>
                    <ProductSwitcher view='grid' currentView={viewMode}
                                     handleCLick={(view) => viewModeToggle(view)}/>
                </div>
            </div>

            <div className="product-list" data-view={viewMode}>
                {productItems}
            </div>

        </div>
    );

}

export default Products;
