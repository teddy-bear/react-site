import React from "react";
import Form from "./Form";

class TableData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            wishlist: ['iPhone 9', 'iPhone X', 'Marshall Bass', 'AirPods PRO'],
            removedItem: null
        }
    }

    /**
     * Delete row
     * @param item
     */
    handleRemoveRowClick = (item) => {
        if (item !== this.state.removedItem) {
            const result = [...this.state.wishlist].filter(word => word !== item);
            this.setState({
                wishlist: result,
                removedItem: item
            });
        }
    }

    /**
     * Restore deleted row
     * @param item
     */
    handleRestoreRowClick = (item) => {
        this.setState({
            wishlist: [...this.state.wishlist, item], removedItem: null
        })
    }

    /**
     * Add new table row
     * @param item
     */
    handleFormSubmit = (item) => {
        this.setState({
            wishlist: [...this.state.wishlist, item]
        })
    }


    render() {
        const tabs = this.state.wishlist;

        const rows = tabs.map((item, index) => {
            return <tr key={index} className={'row-' + index}>
                <td>{++index}</td>
                <td>{item}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => this.handleRemoveRowClick(item)}>remove</button>
                </td>
            </tr>;
        });

        let removedItem = this.state.removedItem;

        let message;
        if (removedItem) {
            message = <div className="alert alert-danger" role="alert">
                You removed {removedItem}
                <span
                    className="btn btn-primary"
                    onClick={() => this.handleRestoreRowClick(removedItem)}>
                    Restore
                </span>
            </div>;
        }

        return (<div className="table-wrap">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
            {message}
            <Form onFormSubmit={this.handleFormSubmit}/>
        </div>)
    }
}

export default TableData;