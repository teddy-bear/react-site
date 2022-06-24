import React from "react";

export default function FormField(props) {

    let field = props.field;

    let required = field.required ? '*' : '',
        description = field.description ? <div className="form-text">{field.description}</div> : '';

    let validClass = '';
    if (field.valid != null) {
        validClass = field.valid ? 'is-valid' : 'is-invalid';
    }

    let errorMessage;
    if (field.valid === false) {
        errorMessage = <div className='invalid-feedback'>{field.errorText}</div>
    }

    let input;

    switch (field.type) {
        case 'textarea':
            input = <textarea
                name={field.name}
                className={`form-control ${validClass}`}
                value={field.value}
                placeholder={field.placeholder}
                onChange={props.handleInputChange}
                onBlur={props.handleInputBlur}
            >
            </textarea>;
            break;
        case 'select':
            input = 'select';
            break;
        case 'radio':
            input = 'radio';
            break;
        default:
            input = <input
                name={field.name}
                type={field.type}
                className={`form-control ${validClass}`}
                value={field.value}
                placeholder={field.placeholder}
                onChange={props.handleInputChange}
                onBlur={props.handleInputBlur}
            />;
    }

    return (
        <label className="form-label">
            {field.label} <sup>{required}</sup>
            {input}
            {description}
            {errorMessage}
        </label>
    )
};
