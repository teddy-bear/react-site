import React from "react";
import Menu from "./Menu";

export default function Header(props) {
    return (
        <header className="page-header">
            <Menu handleNavbarView={props.handleNavbarView} handleMinicartView={props.handleMinicartView}/>
        </header>
    )
}
