import React from "react";
import SearchBar from "./searchBar";
import API from "../../api";
import Product from "../products/Product";
import debounce from 'lodash.debounce';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            products: []
        }

        this.getProductsDebounced = debounce(this.getProducts, 300);
    }

    componentDidMount () {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    /**
     * Retrieve products from global API via async fetch
     * @param needle
     */
    getProducts = (needle) => {
        let url = `/search?q=${needle}`;

        const fetchData = async () => {
            try {
                this.setState({
                    isFetching: true
                });
                const response = await API.get(url);
                this.setState({
                        products: response.data,
                        isFetching: false
                    }
                );
            } catch (e) {
                console.log(e);
                this.setState({
                        isFetching: false
                    }
                );
            }
        };
        fetchData();
    }

    /**
     * Listen for the input value change
     * @param text
     */
    handleSearchTextChange = (text) => {
        this.setState({
            filterText: text
        })
        this.getProductsDebounced(this.state.filterText);
    }

    render() {
        let products = this.state.products.products,
            productItems,
            resCount;

        if (products) {
            productItems = products.map((item, index) => {
                return <Product
                    key={index}
                    product={{...item}}
                />
            });
            resCount = <div className="res-count">
                Total: <strong>{products.length}</strong>
            </div>
        }

        return (
            <div className='product-list-wrap'>
                <SearchBar
                    filterText={this.state.filterText}
                    onSearchTextChange={this.handleSearchTextChange}
                    loading={this.state.isFetching}
                />
                {resCount}
                <div className="search-results product-list" data-view="grid">
                    {productItems}
                </div>
            </div>
        )
    }
}

export default SearchPage;
