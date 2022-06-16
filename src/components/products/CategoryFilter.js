import React from "react";
import CategoryFilterButton from "./CategoryFilterButton";

const CategoryFilter = (props) => {

    let products = props.products,
        categories = [''],
        content;

    /**
     * Set active category
     * @param value
     */
    const setCategory = (value) => {
        props.handleClick(value);
    }

    if (products) {
        products.forEach((element) => {
            categories = [...categories, element.category];
        });

        // Remove duplicated category names
        categories = categories.filter((category, index, array) => {
            return array.indexOf(category) === index;
        })

        content = categories.map((item, index) => {
            return (
                <CategoryFilterButton
                    key={index}
                    category={item}
                    currentCategory={props.currentCategory}
                    handleClick={() => setCategory(item)}
                >
                    {item}
                </CategoryFilterButton>
            );
        })
    }

    return (
        <div className="category-filter">
            <div className="btn-group">
                {content}
            </div>
        </div>
    );
}

export default CategoryFilter;