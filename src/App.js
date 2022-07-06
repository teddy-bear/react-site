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

function App() {

    const [modal, setModal] = useState({
        show: false,
        cssClass: '',
        content: ''
    });

    const [showNavbar, setNavbarVisibility] = useState(false);

    //todo: to be removed, get minicart visibility props from setMinicart hook
    const [showMinicart, setMinicartVisibility] = useState(false);
    const [minicart, setMinicart] = useState({
        show: false,
        products: ''
    });

    const [removedItems, setRemovedItems] = useState([]);

    const navbarToggleView = () => {
        setNavbarVisibility(!showNavbar);
    }

    const minicartToggleView = () => {
        setMinicartVisibility(!showMinicart);
    }

    /**
     * Set page attribute for styling purposes
     * @param view
     */
    const setPageDataAttribute = (view) => {
        let pageClass;

        switch (view) {
            case '/':
                pageClass = 'home';
                break;
            case '/products':
                pageClass = 'pcp';
                break;
            case '/checkout':
                pageClass = 'checkout';
                break;
            default:
                pageClass = 'pdp';
        }

        document.body.dataset.view = pageClass;
    }

    /**
     * Disable all popovers on the url update
     * @type {Location<LocationState>}
     */
    let location = useLocation();
    useEffect(() => {

        setNavbarVisibility(false);
        setMinicartVisibility(false);
        setModal({
            show: false
        });
        setPageDataAttribute(location.pathname);

    }, [location]);

    // todo: optimize via data attr, use declarative approach
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
        if (showMinicart) {
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
        show={showMinicart}
        minicart={minicart}
        removedItems={removedItems}
        handleMinicartView={() => minicartToggleView()}
    />;

    let miniCartComponentHeader;
    if (location.pathname !== '/checkout') {
        miniCartComponentHeader = miniCartComponent;
    }

    return (
        <div className="page-wrap">
            <GlobalProvider value={{
                modal: handleModal,
                getModal: modal,
                updateMinicart: handleMinicart,
                getMinicart: minicart,
                handleRemovedItems: handleRemovedItems,
                getRemovedItems: removedItems
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
                            <Route path="/checkout" element={<Checkout>{miniCartComponent}</Checkout>}/>
                            <Route path="*" element={<Page404/>}/>
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
