import axios from 'axios';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER }from './types';
import { USER_SERVER } from '../components/Config';

// export function registerUser(data) {
//     const request = axios.post(`${USER_SERVER}/register`, data)
//         .then(res => res.data);

//     return {
//         type: REGISTER_USER,
//         payload: request
//     }
// };

export function loginUser(body) {
    const request = axios.post(`${USER_SERVER}/login`, body)
        .then(res => res.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
};

export function logoutUser(body) {
    const request = axios.get(`${USER_SERVER}/logout`, body)
        .then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
};

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(res => res.data);
    
    return{
        type: AUTH_USER,
        payload: request
    }
}