import React, {useEffect} from 'react';
import {useForm, Controller} from "react-hook-form";
import Select from 'react-select';
import Header from "./Header";
import GlobalContext from "../context/globalContext";

export default function ContactForm() {

    // Get global context
    const {modal} = React.useContext(GlobalContext);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors, isSubmitSuccessful},
        control
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    // todo: connect data to the redux state
    // Submit your data into Redux store
    // const onSubmit = data => props.updateAction(data);

    // watch input value by passing the name of it
    //console.log(watch("name"));

    const selectOptions: Array<object> = [
        {label: 'male', value: 'male'},
        {label: 'female', value: 'female'}
    ]

    useEffect(() => {
        if (isSubmitSuccessful) {
            modal(true, 'form has been successfully submitted', 'Message');
            reset();
        }
    }, [isSubmitSuccessful, modal.show]);

    // todo: optimize errors messages
    const errorText = (name) => {
        let text = `${name} is invalid`;
        switch (errors.name?.type) {
            case 'pattern':
                text = `invalid ${name} format`;
                break;
            case 'required' :
                text = `${name} is required`;
                break;
            case 'minLength' :
                text = `${name} is too short`;
                break;
        }
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className='contact-form' onSubmit={handleSubmit(onSubmit)}>
            <Header renderCount={12}/>
            <label className="form-label" aria-invalid={errors.name ? "true" : "false"}>
                <input className='form-control'
                       placeholder='Your name'
                       {...register("name", {
                           pattern: /^[A-Z a-z]+$/i,
                           required: true,
                           minLength: 3
                       })}
                />
                {errors.name?.type === 'pattern' && <div className='invalid-feedback'>invalid name format</div>}
                {errors.name?.type === 'required' && <div className='invalid-feedback'>field is required</div>}
                {errors.name?.type === 'minLength' && <div className='invalid-feedback'>field is too short</div>}
            </label>
            {/* include validation with required or other standard HTML validation rules */}
            <label className="form-label" aria-invalid={errors.email ? "true" : "false"}>
                <input className='form-control' placeholder='Email' defaultValue=''
                       {...register("email", {required: true})}
                />
                {errors.email && <div className='invalid-feedback'>Email field is required</div>}
            </label>

            <label className="form-label">
                <span>Gender:</span>
                <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({}) => (
                        <Select
                            options={selectOptions}
                        />
                    )}
                />
            </label>

            <label className="form-label">
                <textarea className='form-control' placeholder='Message' defaultValue=''
                          {...register("message", {})}
                ></textarea>
            </label>

            <div className="actions">
                <input className='btn btn-primary' type="submit"/>
            </div>
        </form>
    );
}

// Connect form component with redux
// connect(({ firstName, lastName }) => ({ firstName, lastName }), updateAction)(ContactForm);