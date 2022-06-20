import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
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

    return (
        <div className="page-wrap">
            <GlobalProvider value={{modal: handleModal, updateMinicart: handleMinicart, getMinicart: minicart}}>
                <Header handleNavbarView={() => navbarToggleView()} handleMinicartView={() => minicartToggleView()}/>
                <Navbar show={showNavbar} handleNavbar={() => navbarToggleView()}/>
                <Minicart
                    show={showMinicart}
                    minicart={minicart}
                    handleMinicartView={() => minicartToggleView()}
                />
                <main className="main-section">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={pageHome}/>
                            <Route path="/products" element={<Products/>}/>
                            <Route path="/products/product/:id" element={<ProductPage/>}/>
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
