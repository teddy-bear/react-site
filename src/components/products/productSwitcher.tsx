import React from "react";

const productSwitcher = (props) => {

    let iconText = props.view === 'list' ? 'list' : 'grid_view';
    let active = props.view === props.currentView ? 'active' : '';

    return (
        <div
            data-active={active}
            data-view={iconText}
            onClick={() => props.handleCLick(props.view)}>
            <span className="material-symbols-outlined">{iconText}</span>
        </div>
    )
}

export default productSwitcher;