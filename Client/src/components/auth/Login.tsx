import React, { useState, useContext } from 'react';

import { AuthContext } from "../../contexts/auth";
import { AuthContextType } from '../../types/common';

// ----------------------------------------------------------------------

const Login = () => {

    const initialValues = {
        email: "",
        password: "",
    };

    const { login } = useContext(AuthContext) as AuthContextType;
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleLogin = (e: React.FormEvent) => {
        const data = {
            email: values.email,
            password: values.password
        }
        e.preventDefault();
        login(data);
        setValues(initialValues);
    };

    return (
        <form onSubmit={(e) => handleLogin(e)}>
            <div>
                <div>
                    <label htmlFor="email">email</label>
                    <input onChange={handleInputChange} type="text" value={values.email} name='email' />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input onChange={handleInputChange} type="text" value={values.password} name='password' />
                </div>
            </div>
            <button disabled={values.email === '' || values.password === ''}>Login</button>
        </form>
    );
};

export default Login;