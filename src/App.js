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
import {ModalProvider} from "./components/modal/modalContext";
import ProductPage from "./components/pdp/productPage";

function App() {

    const [modal, setModal] = useState({
        show: false,
        content: ''
    });

    const [showNavbar, setNavbarVisibility] = useState(false);

    const navbarToggleView = () => {
        setNavbarVisibility(!showNavbar);
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
            <ModalProvider value={handleModal}>
                <Header handleNavbarView={() => navbarToggleView()}/>
                <Navbar show={showNavbar} handleNavbar={() => navbarToggleView()}/>
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
            </ModalProvider>
        </div>
    );
}

export default App;
