import React, { useState, useContext } from 'react';

import { AuthContext } from "../../contexts/auth";
import { AuthContextType } from '../../types/common';

// ----------------------------------------------------------------------

const Signup = () => {

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const { signup } = useContext(AuthContext) as AuthContextType;
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSignup = (e: React.FormEvent) => {
        const data = {
            name: values.name,
            email: values.email,
            password: values.password
        }
        e.preventDefault();
        signup(data);
        setValues(initialValues);
    };

    return (
        <form onSubmit={(e) => handleSignup(e)}>
            <div>
                <div>
                    <label htmlFor="name">name</label>
                    <input onChange={handleInputChange} type="text" value={values.name} name='name' />
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input onChange={handleInputChange} type="text" value={values.email} name='email' />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input onChange={handleInputChange} type="text" value={values.password} name='password' />
                </div>
            </div>
            <button disabled={values.email === '' || values.password === '' || values.name === ''}>
                Signup
            </button>
        </form>
    );
};

export default Signup;