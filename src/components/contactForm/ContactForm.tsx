import React from 'react';
import {useForm, Controller} from "react-hook-form";
import Select from 'react-select';
import Test from "../../Test";

export default function ContactForm() {
    const {register, handleSubmit, formState: {errors}, control} = useForm();
    const onSubmit = data => console.log(data);

    // watch input value by passing the name of it
    //console.log(watch("name"));

    const selectOptions: Array<object> = [
        {label: 'male', value: 'male'},
        {label: 'female', value: 'female'}
    ]

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <Test renderCount={12}/>
            <label className="form-label">
                <input className='form-control' placeholder='name' defaultValue="" {...register("name")} />
            </label>
            {/* include validation with required or other standard HTML validation rules */}
            <label className="form-label">
                <input className='form-control' placeholder='email' {...register("email", {required: true})} />
            </label>
            {/* errors will return when field validation fails  */}
            {errors.email && <div className='invalid-feedback1'>Email field is required</div>}

            <label className="form-label">
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

            <div className="actions">
                <input className='btn btn-primary' type="submit"/>
            </div>
        </form>
    );
}
