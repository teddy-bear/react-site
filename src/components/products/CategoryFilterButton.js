import React from "react";

const CategoryFilterButton = (props) => {

    let active = props.currentCategory === props.category ? 'active' : '';

    const setCategory = (value) => {
        props.handleClick(value);
    }

    return (
        <button
            type="button"
            className={`btn btn-primary ${active}`}
            onClick={() => setCategory(props.category)}>
            {props.children || 'All'}
        </button>
    );
}

export default CategoryFilterButton;
