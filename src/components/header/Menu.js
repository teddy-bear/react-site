import React from "react";
import MenuLink from "./MenuLink";

function Menu(props) {

    const toggleNavbar = () => {
        props.handleNavbarView();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => toggleNavbar()}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <ul className="navbar-nav">
                    <MenuLink to='/'>Home</MenuLink>
                    <MenuLink to='/products'>Products</MenuLink>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;
