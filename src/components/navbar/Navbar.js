import React from 'react';
import Aux from "../hoc/Aux";
import Overlay from "../functional/Overlay";
import TableData from "../table/tableData";
import Accordion from "../accordion/accordion.tsx";

function Navbar(props) {

    return (
        <Aux>
            <div className="nav-panel slide-panel">
                <h3>My whishlist</h3>
                <TableData/>
                <Accordion/>
            </div>
            <Overlay show={props.show} clicked={props.handleNavbar}/>
        </Aux>
    )

}

export default Navbar;
