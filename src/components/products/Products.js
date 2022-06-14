import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Product from "./Product";

const Products = () => {

    const [data, setData] = useState({products: [], isFetching: false});

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

    return <Product products={data.products.products}
                    isFetching={data.isFetching}
    />

}

export default Products;
