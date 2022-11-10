import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Page404 from "./components/functional/Page404";
import {GlobalProvider} from "./components/context/globalContext";
import ProductPage from "./components/pdp/productPage";
import Minicart from "./components/minicart/Minicart";
import Checkout from "./components/checkout/Checkout";
import HomePage from "./components/home/homePage";
import SearchPage from "./components/search/searchPage";
import Polygon from './components/misc/polygon';

function App() {

    const [modal, setModal] = useState({
        show: false,
        cssClass: '',
        content: '',
        title: 'Sample modal'
    });

    const [showNavbar, setNavbarVisibility] = useState(false);

    const [minicart, setMinicart] = useState({
        show: false,
        products: []
    });

    const [removedItems, setRemovedItems] = useState([]);

    const [wishListItems, setWishListItems] = useState({
        products: []
    });

    /**
     * Navbar toggle view
     */
    const navbarToggleView = () => {
        setNavbarVisibility(!showNavbar);
    }

    /**
     * Minicart display options
     */
    const minicartToggleView = () => {
        setMinicart({
            show: !minicart.show,
            products: [...minicart.products]
        });
    }

    /**
     * Set page attribute for styling purposes
     * @param pathname
     */
    const setPageDataAttribute = (pathname) => {
        let routeLocation = pathname.replaceAll('/', '');

        if (pathname === '/') {
            routeLocation = 'home';
        } else if (pathname.includes('/products/product/')) {
            routeLocation = 'pdp';
        }

        document.body.dataset.location = routeLocation;
    }

    /**
     * Disable all popovers on the url update
     * @type {Location}
     */
    let location = useLocation();
    useEffect(() => {

        setNavbarVisibility(false);
        setMinicart({
            show: false,
            products: [...minicart.products]
        });
        setModal({
            show: false
        });
        setPageDataAttribute(location.pathname);

    }, [location]);

    /**
     * Set body classes for the proper design
     */
    useEffect(() => {
        if (showNavbar) {
            document.body.classList.add('nav-panel-open');
        } else {
            document.body.classList.remove('nav-panel-open');
        }
        if (modal.show) {
            document.body.classList.add('modal-show');
        } else {
            document.body.classList.remove('modal-show');
        }
        if (minicart.show) {
            document.body.classList.add('minicart-open');
        } else {
            document.body.classList.remove('minicart-open');
        }
    });

    /**
     * Configure modal options
     * @param show
     * @param modalContent
     * @param modalTitle
     * @param cssClass
     */
    const handleModal = (show = false, modalContent = '', modalTitle = false, cssClass = '') => {
        setModal({
            show: show,
            content: modalContent,
            title: modalTitle,
            cssClass: cssClass
        });
    }

    /**
     * Update Minicart state
     * @param show
     * @param products
     * @param remove
     */
    const handleMinicart = (show = false, products, remove) => {

        let newProducts = [...minicart.products];

        if (remove) {
            newProducts = [...products];
        } else if (products && typeof products === 'object') {
            newProducts = [...minicart.products, products]
        }

        setMinicart({
            show: show,
            products: newProducts,
        })
    }

    /**
     * Update wishlist state
     * @param product
     * @param remove
     */
    const handleWishlist = (product, remove) => {

        let items = [...wishListItems.products];

        if (remove) {
            items = items.filter((item) => item.id !== product.id)
        } else if (product && typeof product === 'object') {
            items = [...wishListItems.products, product]
        }

        setWishListItems({
            products: items
        })
    }

    /**
     * Set Minicart removed items
     * @param product
     * @param restore
     */
    const handleRemovedItems = (product, restore) => {
        if (restore) {
            const arr = removedItems.filter((item) => {
                return item.id !== product.id;
            })
            setRemovedItems([...arr]);
        } else {
            setRemovedItems([...removedItems, product]);
        }
    }

    let miniCartComponent = <Minicart
        minicart={minicart}
        removedItems={removedItems}
        handleMinicartView={() => minicartToggleView()}
    />;

    let miniCartComponentHeader = location.pathname !== '/checkout' ? miniCartComponent : null;

    return (
        <div className="page-wrap">
            <GlobalProvider value={{
                modal: handleModal,
                getModal: modal,
                updateMinicart: handleMinicart,
                getMinicart: minicart,
                handleRemovedItems: handleRemovedItems,
                getRemovedItems: removedItems,
                handleWishlist: handleWishlist,
                getwishListItems: wishListItems
            }}>
                <Header handleNavbarView={() => navbarToggleView()} handleMinicartView={() => minicartToggleView()}/>
                <Navbar show={showNavbar} handleNavbar={() => navbarToggleView()} handleModal={() => handleModal()}/>
                {miniCartComponentHeader}
                <main className="main-section">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/products" element={<Products/>}/>
                            <Route path="/products/product/:id" element={<ProductPage/>}/>
                            <Route path="/search" element={<SearchPage/>}/>
                            <Route path="/checkout" element={<Checkout>{miniCartComponent}</Checkout>}/>
                            <Route path="*" element={<Page404/>}/>
                            <Route path="/polygon" element={<Polygon/>}/>
                        </Routes>
                    </div>
                </main>
                <footer>
                    Copyright Mike 2022
                </footer>
                <Modal
                    handleModal={() => handleModal()}
                    show={modal.show}
                    title={modal.title}
                    cssClass={modal.cssClass}
                >
                    {modal.content}
                </Modal>
            </GlobalProvider>
        </div>
    );
}

export default App;
