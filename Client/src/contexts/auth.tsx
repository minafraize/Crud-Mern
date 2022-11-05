import React, { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { FunctionComponent, AuthContextType } from '../types/common';
import authServices from '../services/auth';

// ----------------------------------------------------------------------

//Aliases
type ContextType = AuthContextType | null;

// AuthContext
export const AuthContext = createContext<ContextType>(null);

const AuthContextProvider: React.FC<FunctionComponent> = ({ children }) => {

    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);

    const login = (data: { email: string, password: string }): void => {
        authServices.login(data)
            .then(res => {
                setIsAuth(true);
                navigate("/");
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const signup = (data: { name: string, email: string, password: string }): void => {
        authServices.signup(data)
            .then(res => {
                navigate("/auth/login")
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    };

    const logout = (): void => {
        setIsAuth(false);
        navigate("/auth/login");
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;