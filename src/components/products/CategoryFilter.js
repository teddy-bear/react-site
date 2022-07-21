import React from "react";
import CategoryFilterButton from "./CategoryFilterButton";

const CategoryFilter = (props) => {

    let categories,
        content;

    /**
     * Set active category
     * @param value
     */
    const setCategory = (value) => {
        props.handleClick(value);
    }

    if (props.categories) {
        categories = ['', ...props.categories]; // add first blank item for `All` category

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
