import React from 'react';
import Aux from "../hoc/Aux";
import Overlay from "../functional/Overlay";

function Navbar(props) {

    return (
        <Aux>
            <div className="nav-panel">
                navbar slide panel
            </div>
            <Overlay clicked={props.modalClosed} />
        </Aux>
    )

}

export default Navbar;
