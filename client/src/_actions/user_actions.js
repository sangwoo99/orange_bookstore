import axios from 'axios';
import { LOGIN_USER, AUTH_USER }from './types';
import { USER_SERVER } from '../components/Config';
import { apiReqLog, apiResLog } from '../components/views/utils/loghelper';

export function loginUser(body) {
    apiReqLog('/login', 'loginUser', body);
    const request = axios.post(`${USER_SERVER}/login`, body)
        .then(res => res.data);
    apiResLog('/login', 'loginUser');

    return {
        type: LOGIN_USER,
        payload: request
    }
};

export function auth() {
    apiReqLog('/auth', 'auth');
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(res => res.data);
    apiResLog('/auth', 'auth', request);

    return{
        type: AUTH_USER,
        payload: request
    }
}