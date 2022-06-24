import React from "react";
import FormField from "./formField";
import GlobalContext from "../context/globalContext";

const formFieldsList = {
    name: {
        name: 'name',
        label: 'Your name',
        type: 'text',
        placeholder: 'First name and Last name',
        errorText: 'wrong name',
        required: true,
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
        valid: null
    },
    comments: {
        name: 'comments',
        label: 'Additional info',
        type: 'textarea',
        placeholder: 'optional',
        errorText: 'add at least one word',
        required: false,
        valid: null
    }

};

class CheckoutForm extends React.Component {
    state = {
        fields: formFieldsList,
        errors: {},
        formValid: true
    }

    // Get global context
    static contextType = GlobalContext;

    handleSubmit = (e) => {
        e.preventDefault();

        const minicart = [...this.context.getMinicart.products],
            modal = this.context.modal,
            handleMinicart= this.context.updateMinicart;

        let orderedProducts,
            modalContent,
            blockProducts,
            orderDetails;

        if (minicart.length) {
            orderedProducts = minicart.map((item, index) => {
                return <li key={index} className='list-group-item'>{item.title} - <span>${item.price}</span></li>
            })
            blockProducts = <div className='block-products'>
                <h4>Products</h4>
                <ul className='list-group'>
                    {orderedProducts}
                </ul>
            </div>
        }

        let {name, email, address, payment} = this.state;

        orderDetails = <div className="order-details">
            <h4>Customer info</h4>
            <ul className='list-group'>
                <li className='list-group-item'>{name}</li>
                <li className='list-group-item'>{email}</li>
                <li className='list-group-item'>{address}</li>
                <li className='list-group-item'>{payment}</li>
            </ul>
        </div>;

        modalContent = <div className='inner'>
            {blockProducts}
            {orderDetails}
        </div>;

        modal(true, modalContent, 'Order complete!');

        // Empty cart on order placement
        handleMinicart(false, [], true);

        //console.log(e);
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
        });
    }

    /**
     * Field focus lost event handler
     * @param e
     */
    handleInputBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        //console.log(e.target);
        if (value.length) {
            this.inputValidate(e);
        }
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
        return value.match(/^[0-9]+$/) !== null;
    }

    /**
     * Form fields validation
     * @param e
     */
    inputValidate = (e) => {

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
        let fields = {...this.state.fields};

        // select needed object.key and pass only updated key:value pair inside
        fields[name] = {
            ...fields[name],
            valid: isValid
        };

        let fieldNames = Object.keys(fields);
        let invalidFields = fieldNames.filter((item) => {
            let field = fields[item];
            if (field.required) {
                return field.valid !== true;
            }
        });

        let formValid = !invalidFields.length;

        console.log(invalidFields);

        this.setState({
            fields,
            formValid: formValid
        });
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

            return field.valid !== true;
        });

        let invalidFieldsList = invalidFields.map((item, index) => {
            return <div key={index}>inv field: {item}</div>;
        });

        return (
            <form className='customer-form' onSubmit={this.handleSubmit}>
                <h3>Customer details</h3>
                {fields}
                {/*{invalidFieldsList}*/}
                <button className="btn btn-primary " type='submit' disabled={disabled}>
                    Order now
                </button>
            </form>
        )
    }
}

export default CheckoutForm;
