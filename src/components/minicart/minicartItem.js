import React from "react";
import GlobalContext from "../context/globalContext";

function MinicartItem(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    const {updateMinicart, getMinicart, handleRemovedItems} = React.useContext(GlobalContext);

    const minicartProducts = getMinicart.products;

    /**
     * Remove item from the cart, pass updated products array
     * @param id
     */
    const removeItem = (id) => {
        const arr = minicartProducts.filter((item) => {
            return item.id !== id;
        })

        updateMinicart(true, arr, true);
        handleRemovedItems(id);
    }

    return (
        <div className="item">
            <figure>
                <img src={props.item.thumbnail} alt={props.item.title}/>
            </figure>
            <div className="info">
                <strong>{props.item.title}</strong>
                <div className='price'>${props.item.price}</div>
            </div>
            <span className="icon-remove material-symbols-outlined"
                  onClick={() => removeItem(props.item.id)}>close</span>
        </div>
    )
}

export default MinicartItem;
