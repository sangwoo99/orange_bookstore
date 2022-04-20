import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from '../_actions/types';

// 리덕스에 등록
export default function(state={}, action) {
    switch(action.type) {
        // case REGISTER_USER:
        //     return { ...state, register: action.payload } 
        //     break;
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }; 
        case LOGOUT_USER:
            return { ...state }; 
        case AUTH_USER:
            return { ...state, userData: action.payload } 
        default: 
            return state;
    }
}