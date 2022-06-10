import React, {useState, useEffect} from 'react';
import TabsWidget from './components/tabs/tabsWidget';
import TableData from "./components/table/tableData";
import Modal from "./components/modal/Modal";

function App() {

    const [showModal, setModalVisibility] = useState(false);

    let modal;

    const modalClose = () => {
        setModalVisibility(false);
    }

    if (showModal) {
        modal = <Modal onModalClose={() => modalClose()} show={showModal}>modal content here</Modal>;
        document.body.classList.add('modal-show');
    } else {
        document.body.classList.remove('modal-show');
    }

    return (
        <div className="page-wrap">
            <header className="page-header">
                <nav>
                    <div>link 1</div>
                    <div>link 2</div>
                </nav>
            </header>
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
