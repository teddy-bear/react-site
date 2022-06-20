import React from "react";

function MinicartItem(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    return (
        <div className="item">
            {props.item.title} =
            {props.item.children}
            <hr/>
        </div>
    )
}

export default MinicartItem;
