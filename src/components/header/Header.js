import React from "react";
import Menu from "./Menu";

function Header(props) {

  /*  const modalClose = () => {
        props.onModalClose();
    }*/

    return (
        <header className="page-header">
            <Menu handleNavbarView={props.handleNavbarView} handleMinicartView={props.handleMinicartView}/>
        </header>
    )
}

export default Header;
