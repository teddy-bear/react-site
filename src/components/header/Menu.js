import React from "react";
import MenuLink from "./MenuLink";

function Menu(props) {

    const toggleNavbar = () => {
        props.handleNavbarView();
    }

    const toggleMinicart = () => {
        props.handleMinicartView();
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
                    <li className='nav-item link-minicart' onClick={() => toggleMinicart()}>
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;
