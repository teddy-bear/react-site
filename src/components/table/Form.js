import React from "react";

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: '',
            email: ''
        }
    }

    /**
     * Form submit
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.topic);

        this.setState({
            topic: ''
        })
    }

    /**
     * Store input value at state
     * @param event
     */
    handleInputChange = event => {
        let value = event.target.value;
        let name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    /**
     * Check if string has a number
     * @param str
     * @returns {boolean}
     */
    containsNumber = (str) => {
        return /\d/.test(str);
    }

    render() {
        let submitDisabled,
            statusMessage;

        if (this.state.topic.length > 0) {
            submitDisabled = this.containsNumber(this.state.topic);
            if (this.containsNumber(this.state.topic)) {
                submitDisabled = true;
                statusMessage = <div className="invalid-feedback">
                    Should contain only letters
                </div>
            }
        } else {
            submitDisabled = true;
        }

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder='Add topic'
                        name='topic'
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                    />
                    {statusMessage}
                </label>
                {/*<label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                </label>*/}
                <button type='submit' className="btn btn-success" disabled={submitDisabled}>
                    Add item
                </button>
            </form>
        )
    }
}

export default Form;
