import React, {useState, useEffect} from 'react';
import TabsWidget from './components/tabs/tabsWidget';
import TableData from "./components/table/tableData";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

function App() {

    const [showModal, setModalVisibility] = useState(false);
    const [showNavbar, setNavbarVisibility] = useState(false);

    let modal;

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
        //document.title = `You clicked ${count} times`;u

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

    let navbar;
   // if (showNavbar) {
        navbar = <Navbar show={showNavbar} modalClosed={() => navbarToggleView()}/>;
    //}

    return (
        <div className="page-wrap">
            <Header handleNavbarView={() => navbarToggleView()}/>
            {navbar}
            <main>
                <div className="container">
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
        </div>
    );
}

export default App;
