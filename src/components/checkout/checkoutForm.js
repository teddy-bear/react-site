import React from "react";
import FormField from "./formField";
import GlobalContext from "../context/globalContext";
import {Navigate} from "react-router";

const formFieldsList = {
    name: {
        name: 'name',
        label: 'Your name',
        type: 'text',
        placeholder: 'First name and Last name',
        errorText: 'wrong name',
        required: true,
        value: '',
        valid: null
    },
    email: {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@mail.net',
        errorText: 'invalid mail',
        required: true,
        valid: null,
        value: '',
        description: ''
    },
    payment: {
        name: 'payment',
        label: 'Credit card',
        description: '',
        type: 'text',
        placeholder: '1111 2222 3333 4444',
        errorText: 'wrong card details',
        required: true,
        value: '',
        valid: null
    },
    address: {
        name: 'address',
        label: 'Address',
        //description: 'address to deliver',
        type: 'text',
        placeholder: '',
        errorText: 'please fill address field',
        required: true,
        value: '',
        valid: null
    },
    comments: {
        name: 'comments',
        label: 'Additional info',
        type: 'textarea',
        placeholder: 'optional',
        errorText: 'add at least one word',
        required: false,
        value: '',
        valid: null
    }

};

class CheckoutForm extends React.Component {
    state = {
        fields: formFieldsList,
        errors: {},
        formValid: false,
        isSubmitted: false
    }

    // Get global context
    static contextType = GlobalContext;

    /**
     * Form order submit
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();

        const minicart = [...this.context.getMinicart.products],
            modal = this.context.modal,
            handleMinicart = this.context.updateMinicart;

        let orderedProducts,
            modalContent,
            blockProducts,
            fieldNames,
            listItems,
            orderDetails;

        if (minicart.length) {
            orderedProducts = minicart.map((item, index) => {
                return <li key={index} className='list-group-item'>{item.title} <span>${item.price}</span></li>
            })
            blockProducts = <div className='block-products'>
                <h4>Products</h4>
                <ul className='list-group'>
                    {orderedProducts}
                </ul>
            </div>
        }

        fieldNames = Object.keys(this.state.fields);
        listItems = fieldNames.map((item, index) => {
            let field = this.state.fields[item];

            if (field.required) {
                return <li key={index} className='list-group-item'><strong>{field.label}</strong> {field.value}</li>;
            }
        });

        orderDetails = <div className="order-details">
            <h4>Customer info</h4>
            <ul className='list-group'>
                {listItems}
            </ul>
        </div>;

        modalContent = <div className='inner'>
            {blockProducts}
            {orderDetails}
        </div>;

        modal(true, modalContent, 'Order complete!');

        this.setState({
            isSubmitted: true
        });

        // Empty cart on order placement
        handleMinicart(false, [], true);
    }

    /**
     * Reset form & fields state
     */
    formReset = () => {

        let fields = {...this.state.fields};

        let fieldNames = Object.keys(fields);

        fieldNames.forEach((item) => {
            fields[item].value = '';
            fields[item].valid = null;
        })

        this.setState({
            fields: fields,
            formValid: false,
        });
    }

    /**
     * Store input value at state
     * @param event
     */
    handleInputChange = event => {
        let value = event.target.value;
        let name = event.target.name;

        // copy all fields
        let fields = {...this.state.fields};

        // select needed object.key and pass only updated key:value pair inside
        fields[name] = {
            ...fields[name],
            value: value
        };

        this.setState({
            fields: fields,
        });

        if (value.length) {
            this.inputValidate(event, fields);
        }
    }

    /**
     * Field focus lost event handler
     */
    handleInputBlur = () => {
        // Do some action if needed
    }

    /**
     * Name field validation
     * @param value
     * @returns {boolean}
     */
    validateName = (value) => {
        return value.length >= 4;
    }

    /**
     * Email field validation
     * @param value
     * @returns {boolean}
     */
    validateEmail = (value) => {
        return value.length >= 4;
    }

    /**
     * Textarea field validation
     * @returns {boolean}
     */
    validateTextarea = () => {
        return true;
    }

    /**
     * Credit card validation
     * @param value
     * @returns {*}
     */
    validatePayment = (value) => {
        return value.match(/^[0-9]+$/) !== null && value.length > 4;
    }

    /**
     * Form fields validation
     * @param e
     * @param fields
     */
    inputValidate = (e, fields) => {

        const name = e.target.name;
        const value = e.target.value;

        let isValid;

        switch (name) {
            case 'name':
                isValid = this.validateName(value);
                break;
            case 'email':
                isValid = this.validateEmail(value);
                break;
            case 'comments':
                isValid = this.validateTextarea(value);
                break;
            case 'payment':
                isValid = this.validatePayment(value);
                break;
            default:
                isValid = this.validateName(value);
        }

        // copy all fields
        let newFields = {...fields};

        // select needed object.key and pass only updated key:value pair inside
        newFields[name] = {
            ...newFields[name],
            valid: isValid
        };

        let fieldNames = Object.keys(newFields);
        let invalidFields = fieldNames.filter((item) => {
            let field = newFields[item];
            if (field.required) {
                return field.valid !== true;
            }
        });

        let formValid = !invalidFields.length;

        this.setState({
            fields: newFields,
            formValid: formValid
        });
    }

    /**
     * Perform page redirect after successful order placement
     * @returns {JSX.Element}
     */
    redirectPage = (path) => {
        const modalState = this.context.getModal;

        if (modalState.show === false && this.state.isSubmitted) {
            return <Navigate to={path} replace={true} />
        }
    }

    render() {
        let disabled = !this.state.formValid;
        let fieldNames = Object.keys(this.state.fields);

        let fields = fieldNames.map((item, index) => {
            let field = this.state.fields[item];

            return <FormField
                key={index}
                field={field}
                handleInputChange={this.handleInputChange}
                handleInputBlur={this.handleInputBlur}
            />
        });

        let invalidFields = fieldNames.filter((item,) => {
            let field = this.state.fields[item];

            if (field.required && field.valid != null) {
                return field.valid !== true;
            }
        });

        let invalidFieldsList = invalidFields.map((item, index) => {
            return <div key={index}>inv field: {item}</div>;
        });

        let formErrorMessage;
        if (invalidFieldsList.length) {
            formErrorMessage = <div className="error-fields alert alert-danger">
                <strong>Please check following fields</strong><br />
                {invalidFieldsList}
            </div>
        }

        return (
            <form className='customer-form' onSubmit={this.handleSubmit}>
                <h3>Customer details</h3>
                {fields}
                {formErrorMessage}
                <div className="note">
                    please complete required * marked fields
                </div>
                <button className="btn btn-primary " type='submit' disabled={disabled}>
                    Order now
                </button>
                {this.redirectPage('/')}
            </form>
        )
    }
}

export default CheckoutForm;
