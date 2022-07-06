import React from "react";
import GlobalContext from "../context/globalContext";

export default function RemovedItem(props) {

    let product = props.product;

    const {updateMinicart, handleRemovedItems} = React.useContext(GlobalContext);

    /**
     * Update Minicart
     * @param product
     */
    const handleMinicart = (product) => {
        updateMinicart(true, product)
        handleRemovedItems(product, true);
    }

    return (
        <div className="removed-item alert alert-info actions" onClick={() => handleMinicart(product)}>
            Restore <strong>{product.title}</strong>
        </div>
    )

};
