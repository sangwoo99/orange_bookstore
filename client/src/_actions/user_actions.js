import axios from 'axios';
import { REGISTER_USER, LOGIN_USER }from './types';
import USER_SERVER from '../components/Config';

export function registerUser(data) {
    const request = axios.post(`${USER_SERVER}/register`, data)
        .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
};

export function LOGINUSER(data) {
    const request = axios.post(`${USER_SERVER}/login`, data)
        .then(res => res.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
};