import React from "react";

class TableData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topics: ['JSX', 'Rendering Elements', 'Components & Props', 'State & Lifecycle'],
            removedItem: null,
        }
    }

    /**
     * Delete row
     * @param item
     */
    handleRemoveRowClick = (item) => {
        if (item !== this.state.removedItem) {

            const result = [...this.state.topics].filter(word => word !== item);


            this.setState({
                topics: result,
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
            topics: [...this.state.topics, item],
            removedItem: null
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
    }

    render() {
        const tabs = this.state.topics;

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


        return (
            <div className="table-wrap">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Topic</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
                {message}
                <form className="form" >
                    <label htmlFor="">
                        <input className="form-control" type="text" placeholder='Add topic' name='topic'/>
                    </label>
                    <span className="btn btn-success" onClick={this.handleSubmit}>
                        add item
                    </span>
                </form>
            </div>
        )
    }
}

export default TableData;