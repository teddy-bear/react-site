import React, {useState, useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import TabsWidget from './components/tabs/tabsWidget';
import TableData from "./components/table/tableData";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import Aux from "./components/hoc/Aux";
import Page404 from "./components/functional/Page404";
import {GlobalProvider} from "./components/context/globalContext";
import ProductPage from "./components/pdp/productPage";
import Minicart from "./components/minicart/Minicart";
import Checkout from "./components/checkout/Checkout";
import HomePage from "./components/home/homePage";

function App() {

    const [modal, setModal] = useState({
        show: false,
        content: ''
    });

    const [showNavbar, setNavbarVisibility] = useState(false);
    const [showMinicart, setMinicartVisibility] = useState(false);

    //todo: merge with showMinicart hook
    const [minicart, setMinicart] = useState({
        show: false,
        products: ''
    });

    const navbarToggleView = () => {
        setNavbarVisibility(!showNavbar);
    }

    const minicartToggleView = () => {
        setMinicartVisibility(!showMinicart);
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
    }, [location]);


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
     */
    const handleModal = (show = false, modalContent = '', modalTitle = false) => {
        setModal({
            show: show,
            content: modalContent,
            title: modalTitle
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

    /*Temp section*/
    let modalTabs = <TabsWidget/>;
    let pageHome = <Aux>
        <TableData/>
        <button className='btn btn-info' onClick={() => handleModal(true, modalTabs)}>
            Modal
        </button>
    </Aux>;

    let miniCartComponent = <Minicart
        show={showMinicart}
        minicart={minicart}
        handleMinicartView={() => minicartToggleView()}
    />;

    let miniCartComponentHeader;
    if (location.pathname !== '/checkout') {
        miniCartComponentHeader = miniCartComponent;
    }

    return (
        <div className="page-wrap">
            <GlobalProvider value={{modal: handleModal, updateMinicart: handleMinicart, getMinicart: minicart}}>
                <Header handleNavbarView={() => navbarToggleView()} handleMinicartView={() => minicartToggleView()}/>
                <Navbar show={showNavbar} handleNavbar={() => navbarToggleView()}/>
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
                    footer here
                </footer>
                <Modal
                    handleModal={() => handleModal()}
                    show={modal.show}
                    title={modal.title}
                >
                    {modal.content}
                </Modal>
            </GlobalProvider>
        </div>
    );
}

export default App;
