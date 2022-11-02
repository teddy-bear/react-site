import React from "react";
import GlobalContext from "../context/globalContext";

function WishListIcon(props) {
    const {handleWishlist} = React.useContext(GlobalContext);

    let cssAdded = props.isAdded ? '_added' : '';

    return (
        <div
            onClick={() => {
                handleWishlist(props.product, props.isAdded)
            }}
            className={`icon-wishlist material-symbols-outlined ${cssAdded}`}>favorite</div>
    )
}

export default WishListIcon;
