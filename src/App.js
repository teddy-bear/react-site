import React, {useState, useEffect} from 'react';
import TabsWidget from './components/tabs/tabsWidget';
import TableData from "./components/table/tableData";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";

function App() {

    let modal;

    const [showModal, setModalVisibility] = useState(false);
    const [showNavbar, setNavbarVisibility] = useState(false);

    const modalClose = () => {
        setModalVisibility(false);
    }

    const navbarToggleView = () => {
        setNavbarVisibility(!showNavbar);
    }

    useEffect(() => {
        if (showNavbar) {
            document.body.classList.add('nav-panel-open');
        } else {
            document.body.classList.remove('nav-panel-open');
        }
    });

    if (showModal) {
        modal = <Modal
            onModalClose={() => modalClose()}
            show={showModal}
            title='Modal title'
        >
            modal content here
        </Modal>;
        document.body.classList.add('modal-show');
    } else {
        document.body.classList.remove('modal-show');
    }

    return (<div className="page-wrap">
        <Header handleNavbarView={() => navbarToggleView()}/>
        <Navbar show={showNavbar} modalClosed={() => navbarToggleView()}/>
        <main>
            <div className="container">
                <Products/>
                <TabsWidget/>
                <TableData/>
                <button className='btn btn-info' onClick={() => setModalVisibility(!showModal)}>
                    Modal
                </button>
                {modal}
            </div>
        </main>
        <footer>
            footer here
        </footer>
    </div>);
}

export default App;
