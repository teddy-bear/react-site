import React from "react";
import MenuLink from "./MenuLink";
import GlobalContext from "../context/globalContext";

function Menu(props) {

    const toggleNavbar = () => {
        props.handleNavbarView();
    }

    const toggleMinicart = () => {
        props.handleMinicartView();
    }

    const {getMinicart} = React.useContext(GlobalContext);

    let dataFilled = '';
    let count = '';
    if (getMinicart.products.length) {
        dataFilled = 'filled';
        count = <span className='count'>{getMinicart.products.length}</span>
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
                    <li className='nav-item link-minicart' data-filled={dataFilled} onClick={() => toggleMinicart()}>
                        <span className="material-symbols-outlined">shopping_bag</span>
                        {count}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Menu;
