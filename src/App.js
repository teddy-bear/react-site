import React from 'react';
import TabsWidget from './components/tabsWidget';
import TableData from "./components/tableData";

function App() {
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
                </div>
            </main>
            <footer>
                footer here
            </footer>
        </div>
    );
}

export default App;
