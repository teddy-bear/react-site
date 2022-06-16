import React from "react";

const productSwitcher = (props) => {

    let iconText = props.view === 'list' ? 'list' : 'grid_view';
    let active = props.view === props.currentView ? 'active' : '';

    const handleView = (view, event) => {
        props.handleCLick(view, event)
    }

    return (
        <div
            data-active={active}
            data-view={iconText}
            onClick={(event) => handleView(props.view, event)}>
            <span className="material-symbols-outlined">{iconText}</span>
        </div>
    )
}

export default productSwitcher;