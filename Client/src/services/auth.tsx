import http from './http';
import links from '../constants/links';

// ----------------------------------------------------------------------

const todoUrl = links.auth;

function login(data: { email: string, password: string }) {
    return http.post(todoUrl.login, data);
}

function signup(data: { name: string, email: string, password: string }) {
    return http.put(todoUrl.signup, data);
}

export default {
    login,
    signup
};