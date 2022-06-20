import React from "react";
import Overlay from "../functional/Overlay";
import Aux from "../hoc/Aux";

function Minicart(props) {

    /*  const modalClose = () => {
          props.onModalClose();
      }*/

    return (
        <Aux>
            <div className="minicart slide-panel">
                minicart here
            </div>
            <Overlay show={props.show} clicked={props.handleMinicartView}/>
        </Aux>
    )
}

export default Minicart;
