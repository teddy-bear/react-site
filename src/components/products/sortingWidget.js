import React from "react";

export default function SortingWidget(props) {
    return (
        <div className="price-sorter">
            <select name="sort_order" className='form-select' onChange={props.handleChange}>
                <option value="default">default</option>
                <option value="priceASC">cheapest</option>
                <option value="priceDESC">expensive</option>
                <option value="nameASC">name ASC</option>
                <option value="nameDESC">name DESC</option>
                <option value="rating">rating</option>
            </select>
        </div>
    );
};
